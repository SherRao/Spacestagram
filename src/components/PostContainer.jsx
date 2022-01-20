import React from "react";
import Styled from "styled-components";

import { Caption, Button, MediaCard, Modal } from "@shopify/polaris";
import { HeartMajor } from "@shopify/polaris-icons";

import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const Container = Styled.div`
    padding-bottom: 200px;
`;

const ContentContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 2.5em;
    margin: 1em 1em 2em 1em;
`;

export default function PostContainer({element, db}) {
    const [isModalActive, setModalActive] = React.useState(false);
    const [likes, setLikes] = React.useState(element.likes);

    const Popup = (
        <Modal
            key={`${element.url}-modal`}
            open={isModalActive}
            title={`${element.title} - ${element.date}`}
            onClose={() => setModalActive(false)}
        >
            <p>{element.explanation}</p>
        </Modal>
    );
    
    return (
        <Container>
            {Popup}
            <MediaCard
                title={`${element.title} - ${element.date}`}
                description={element.caption}
                key={`${element.url}-card`} 
                portrait={true}
                primaryAction={
                    { content: "Open", onAction: () => {setModalActive(true);} }   
                }

                secondaryAction={
                    { content: `Like | ${element.likes}`, onAction: () => handleLike(element, setLikes, db), icon: HeartMajor }
                }
            >
                <img
                    src={element.url}
                    alt={element.title}
                    onClick={() => {setModalActive(true);}}
                    width="100%"
                    height="100%"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        cursor: "pointer"
                    }}
                />
            </MediaCard>
        </Container>
    );
}

const handleLike = async (element, setLikes, db) => {
    const colRef = collection(db, "posts");
    const docRef = doc(colRef, "likes");
    const docSnap = await getDoc(docRef);
    const likes = docSnap.data();

    const id = element.date;
    likes[id] = likes[id] + 1;
    element.likes = likes[id];

    setLikes(element.likes);
    await setDoc(docRef, likes);
};