import { styled } from "styled-components";
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Link, useMatch } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom, loggedInUserAtom } from "../atoms";

const Header = () => {
    const dashboardMatch = useMatch('/');
    const tradingMatch = useMatch('/trading/:coinId');
    const isLogin = useRecoilValue(isLoginAtom);
    const setIsLogin = useSetRecoilState(isLoginAtom);
    const loggedInUser = useRecoilValue(loggedInUserAtom);

    return(
        <Container>
            <Nav>
                <Link to="/">
                    <Logo />
                </Link>
                <MenuLists>
                    <MenuItem $isActive={dashboardMatch !== null}>
                        <Link to="/">Dashboard</Link>
                    </MenuItem>
                    <MenuItem $isActive={tradingMatch !== null}>
                        <Link to="/trading/:coinId">Trading</Link>
                    </MenuItem>
                </MenuLists>
                <LoginInfo>
                    {isLogin ? (
                        <>
                            <UserName>{loggedInUser?.name}</UserName>
                            <BtnLogInOut onClick={() => setIsLogin(null)}>Logout</BtnLogInOut>
                        </>
                    ) : <BtnLogInOut onClick={() => setIsLogin(false)}>Login</BtnLogInOut>}
                </LoginInfo>
            </Nav>
        </Container>
    );
}

const UserName = styled.p`
    display: inline-block;
    margin-right: 15rem;
    color: ${props => props.theme.colors.white};
    font-weight: 500;
`;
const BtnLogInOut = styled.button`
    color: ${props => props.theme.colors.nine};
    background-color: transparent;
    transition: color .2s ease-in-out;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colors.primaryTxt};
    }
`;
const LoginInfo = styled.div`
    flex-grow: 1;
    font-size: ${props => props.theme.fontSize.rg};
    text-align: right;
`;
const MenuItem = styled.li<{$isActive: boolean}>`
    padding: 9rem 15rem;
    color: ${props => props.$isActive ? props.theme.colors.primaryTxt : props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.rg};
    font-weight: 500;
    background-color: ${props => props.$isActive && props.theme.colors.primary};
    border-radius: 20rem;
    cursor: pointer;

    &:hover {
        color: ${props => props.$isActive ? props.theme.colors.primaryTxt : props.theme.colors.primary};
    }
`;
const MenuLists = styled.ul`
    display: flex;
    justify-content: center;
    flex-grow: 2;
    gap: 10rem;
    margin: 0 auto;
`;
const Nav = styled.nav`
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 90rem;
    max-width: 1200px;

    a {
        flex-grow: 1;
    }
`;
const Container = styled.div``;

export default Header;