import { styled } from "styled-components";

export const Wrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20rem;
    margin: 0 auto;
    max-width: 1200px;
    color: #FFFFFF;
`;
export const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20rem;
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
export const LoadingMsg = styled.p`
    color: ${props => props.theme.colors.ddd};
    font-size: ${props => props.theme.fontSize.sm};
    font-weight: 500;
    text-align: center;
`;

export const sectionTitle = styled.h3`
    padding-bottom: 10rem;
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.lg};
    font-weight: 500;
    border-bottom: 1px solid ${props => props.theme.colors.three};
`;