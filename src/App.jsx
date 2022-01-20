import React from "react";
import Styled from "styled-components";
import config from "./config";

import { LoadingComponent, PostContainer, Header, AppContainer } from "./components";
import { Page } from "@shopify/polaris";

import { initializeApp } from "@firebase/app";
import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

initializeApp(config.firebaseConfig);
const db = getFirestore();

//const count = 10;
//const url = `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${config.nasaApiKey}&thumbs=true`;

export default function App() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const date = getStartDate();
    const url = `https://api.nasa.gov/planetary/apod?start_date=${date}&api_key=${config.nasaApiKey}&thumbs=true`;

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(url);
            const json = await response.json();

            const colRef = collection(db, "posts");
            const docRef = doc(colRef, "likes");
            const docSnap = await getDoc(docRef);
            const likes = docSnap.data();
            for(const element of json) {
                const id = element.date;
                if(!likes[id])
                    likes[id] = 0;

                element.likes = likes[id];
            }

            await setDoc(docRef, likes);
            setData(json.reverse());
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

/**
 * 
 * Takes a data entry from the NASA APOD endpoint and returns a Card component
 * with the data.
 * 
 */
const generatePost = (element) => {
    const caption = element.explanation.length > 300 ?
        element.explanation.substring(0, 300) + "..." : element.explanation;

    return (
        <PostContainer
            caption={caption}
            element={element}
            db={db}
        />
    );
};

/**
 * 
 * Roughly estimates the date of the first post to be returned by the NASA APOD
 * by going back a month from today.
 *  
 */
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