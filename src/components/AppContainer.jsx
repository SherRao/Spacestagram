import React from "react";
import Styled from "styled-components";
import ParticlesBg from "particles-bg";

const Container = Styled.div`
    width: 100%;
    height: 100%;
`;

export default function AppContainer({children}) {
    return (
        <Container>
            {/* <BackgroundColorContainer/> */}
            <ParticlesBg type="cobweb" bg={true} color="#ffffff"/>
            {children}
        </Container>
    );
}