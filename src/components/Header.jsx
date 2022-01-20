import React from "react";
import Styled from "styled-components";
import { Caption, DisplayText } from "@shopify/polaris";

const Container = Styled.div`
    height: 20vh;
    display: flex;
    align-items: center;
    align-content: center;
    text-align: center;
    color: #d295bf;

    display: flex;
    justify-content: center;
`;

export default function Header() {
    return (
        <Container>
            <DisplayText
                element="h1"
                size="extraLarge"
            >
                    🌙 SPACESTGRAM
            </DisplayText>
            <Caption>
                <a href="https://sherrao.tech" target="_blank" rel="noreferrer" >
                    Made by Nausher Rao
                </a>
            </Caption>
        </Container>
    );
}