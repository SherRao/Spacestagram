import React from "react";
import Styled from "styled-components";

import { MediaCard, Modal } from "@shopify/polaris";
import { HeartMajor } from "@shopify/polaris-icons";

import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const Container = Styled.div`
    padding-bottom: 200px;
`;

const ModalContainer = Styled.div`
    padding: 20px 20px 20px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export default function PostContainer({caption, element, db}) {
    const [isModalActive, setModalActive] = React.useState(false);
    const [likes, setLikes] = React.useState(element.likes);

    const Popup = (
        <Modal
            key={`${element.url}-modal`}
            open={isModalActive}
            title={`${element.title} - ${element.date}`}
            onClose={() => setModalActive(false)}
            alt={element.explanation}
        >
            <ModalContainer>
                <img src={element.url} width="50%" height="50%" />
                <p>{element.explanation}</p>
            </ModalContainer>
        </Modal>
    );

    const Card = (
        <MediaCard
            title={`${element.title} - ${element.date}`}
            description={caption}
            key={`${element.url}-card`} 
            portrait={true}
            primaryAction={
                { content: "Open", onAction: () => {setModalActive(true);} }   
            }

            secondaryAction={
                { content: `Like | ${likes}`, onAction: () => handleLike(element, setLikes, db), icon: HeartMajor }
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
    );
    
    return (
        <Container>
            {Popup}
            {Card}
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