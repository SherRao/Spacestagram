import React from "react";
import Styled from "styled-components";

import { Caption, Icon, MediaCard, Modal } from "@shopify/polaris";
import { HeartMajor } from "@shopify/polaris-icons";

const Container = Styled.div`
    padding-bottom: 200px;
`;

const ContentContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: red;
    height: 2.5em;
    margin: 1em 1em 2em 1em;
`;

export default function PostContainer({title, caption, description, imageUrl, date}) {
    const [isModalActive, setModalActive] = React.useState(false);

    const Popup = (
        <Modal
            key={`${imageUrl}-modal`}
            open={isModalActive}

            title="Reach more shoppers with Instagram product tags"
            primaryAction={{
                content: "Add Instagram",
                // onAction: handleChange,
            }}
            secondaryActions={[
                {
                    content: "Learn more",
                    // onAction: handleChange,
                },
            ]}
        />
    );
    
    return (
        <Container>
            {/* <Popup/> */}
            <MediaCard
                title={title}
                description={caption}
                key={`${imageUrl}-card`}
                portrait={true}
                primaryAction={
                    { content: "Open", onAction: () => {} }   
                }
            >
                <img
                    src={imageUrl}
                    alt={title}
                    onClick={() => {setModalActive(true);}}
                    width="100%"
                    height="100%"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        cursor: "pointer"
                    }}
                />
                <ContentContainer>
                    <Caption>{date}</Caption>
                    <Icon source={HeartMajor} color="success" onClick={handleLike}/>
                </ContentContainer>
            </MediaCard>
        </Container>
    );
}

const handleLike = () => {
    console.log("click");

};