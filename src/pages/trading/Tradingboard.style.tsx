import { styled } from "styled-components";

export const Wrap = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20rem;
    margin: 0 auto 40rem;
    height: calc(100vh - 130rem);
    max-width: 1200px;
    min-height: 668px;
    color: #FFFFFF;
`;
export const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30rem;
    height: calc(100% - 40rem);
`;

export const Container = styled.div``;

export const PanelHead = styled.h2`
    margin-bottom: 20rem;
    color: ${props => props.theme.colors.ddd};
    font-size: ${props => props.theme.fontSize.xl};
    font-weight: 600;
    font-family: Montserrat, sans-serif;
`;

export const Panel = styled.section`
    overflow-y: scroll;
    padding: 30rem 20rem;
    height: 100%;
    background-color: ${props => props.theme.colors.panelBlack};
    border-radius: 15rem;
`;
export const LoadingMsg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    p {
        color: ${props => props.theme.colors.ddd};
        font-size: ${props => props.theme.fontSize.sm};
        font-weight: 500;
    }
`;

export const sectionTitle = styled.h3`
    padding-bottom: 10rem;
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.lg};
    font-weight: 500;
    border-bottom: 1px solid ${props => props.theme.colors.three};
`;