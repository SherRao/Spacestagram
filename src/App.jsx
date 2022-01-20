import React from "react";
import Styled from "styled-components";

import config from "../config";

import { LoadingComponent, PostContainer, Header, AppContainer } from "./components";
import { Layout, Page } from "@shopify/polaris";

import { initializeApp } from "@firebase/app";
import { getFirestore, collection, setDoc, doc, getDoc } from "firebase/firestore";

initializeApp(config.firebaseConfig);
const db = getFirestore();

const getStartDate = () => {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate() - 15;
    if(date < 1) {
        month = month - 1;
        date = 30;
    }

    if(month < 1) {
        month = 12;
        year -= 1;
    }

    return [year, month, date].join("-");
};

const date = getStartDate();

const count = 10;
const url = `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${config.nasaApiKey}&thumbs=true`;
const url2 = `https://api.nasa.gov/planetary/apod?start_date=${date}&api_key=${config.nasaApiKey}&thumbs=true`;

export default function App() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(url2);
            const json = await response.json();

            const colRef = collection(db, "posts");
            const docRef = doc(colRef, "likes");
            const docSnap = await getDoc(docRef);
            const likes = docSnap.data();
            for(const element of json) {
                const id = element.date;
                if(!likes[id])
                    likes[id] = 1;

            }
            
            await setDoc(docRef, likes);
            setData(json);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <AppContainer>
            {loading ? (<LoadingComponent/>) : (
                <Page title="">
                    <Header />
                    {data.map(element => generatePost(element))}
                </Page>
            ) }
        </AppContainer>
    );
}

const generatePost = (element) => {
    const caption = element.explanation.length > 200 ?
        element.explanation.substring(0, 100) + "..." : element.explanation;

    return (
        <PostContainer
            title={element.title}
            caption={caption}
            description={element.explanation}
            imageUrl={element.url}
            date={element.date}
        />
    );
};

const handlePrimaryAction = (action) => {
};

const handleSecondaryAction = (action) => {
};