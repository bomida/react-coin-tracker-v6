import { styled } from "styled-components";

export const Wrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr, 2fr);
    gap: 20px;
    color: ${props => props.theme.colors.white};
`;

export const Panel = styled.section`
    background-color: ${props => props.theme.colors.panelBlack};
    border-radius: 20px;
`;
