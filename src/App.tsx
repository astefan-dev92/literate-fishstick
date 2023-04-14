import styled from "styled-components";

import { useFeatureToggle } from "./hooks";

import { FeatureTypes } from "./app-slice";

import catImg from "./assets/cat.gif";

import "./App.css";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 200px;
    height: 200px;
`;

function App() {
    const { hasFeatureEnabled } = useFeatureToggle();
    const catEnabled = hasFeatureEnabled(FeatureTypes.MATRIX_CAT);

    return (
        <Container>
            {true && (
                <div>
                    <Image src={catImg} />
                </div>
            )}
        </Container>
    );
}

export default App;
