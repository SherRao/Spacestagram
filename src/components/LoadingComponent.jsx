import React from 'react';
import Styled from 'styled-components';
import { Rings } from  'react-loader-spinner'

const Container = Styled.div`
    position: fixed;
    z-index: 999;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 250px;
    height: 250px;
`;

export default function LoadingComponent() {
    return (
        <Container>
            <Rings color="#d295bf" height={200} width={200} />
        </Container>
    );
}