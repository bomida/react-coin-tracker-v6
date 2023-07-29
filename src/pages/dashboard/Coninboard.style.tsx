import { styled } from "styled-components";

export const Wrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 40rem 20rem;
    margin: 0 auto;
    /* height: calc(100vh - 160rem); */
    padding: 20rem 0 50rem;
    max-width: 1200px;
    color: #FFFFFF;
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
    padding: 30rem 20rem;
    background-color: ${props => props.theme.colors.panelBlack};
    border-radius: 15rem;
    `;

export const sectionTitle = styled.h3`
    padding-bottom: 10rem;
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.lg};
    font-weight: 500;
    border-bottom: 1px solid ${props => props.theme.colors.three};
`;