import { styled } from "styled-components";
import { ReactComponent as Logo } from '../assets/logo.svg';
import { useMatch } from "react-router-dom";

function Header() {
    const dashboardMatch = useMatch('/');
    const tradingMatch = useMatch('/trading');
    return(
        <Container>
            <Nav>
                <Logo />
                <MenuLists>
                    <MenuItem $isActive={dashboardMatch !== null}>Dashboard</MenuItem>
                    <MenuItem $isActive={tradingMatch !== null}>Trading</MenuItem>
                </MenuLists>
            </Nav>
        </Container>
    );
}

const Container = styled.div``;
const Nav = styled.nav`
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 30rem;
    max-width: 1200rem;
`;
const MenuLists = styled.ul`
    display: flex;
    gap: 10rem;
    margin: 0 auto;
`;
const MenuItem = styled.li<{$isActive: boolean}>`
    padding: 9rem 15rem;
    color: ${props => props.$isActive ? props.theme.colors.primaryTxt : props.theme.colors.white};
    font-size: 13rem;
    font-weight: 500;
    background-color: ${props => props.$isActive && props.theme.colors.primary};
    border-radius: 20rem;
    cursor: pointer;

    &:hover {
        color: ${props => props.$isActive ? props.theme.colors.primaryTxt : props.theme.colors.primary};
    }
`;

export default Header;