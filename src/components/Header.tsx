import { styled } from "styled-components";
import { ReactComponent as Logo } from '../assets/logo.svg';

function Header() {
    return(
        <Container>
            <Nav>
                <Logo />
                <MenuLists>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Trading</MenuItem>
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
const MenuItem = styled.li`
    padding: 9rem 15rem;
    color: #ffffff;
    font-size: 13rem;
    font-weight: 500;
    border-radius: 20rem;
    transition: background-color .2s ease-in-out;
    cursor: pointer;

    &:hover {
        color: #141518;
        background-color: #E2E247;
    }
`;

export default Header;