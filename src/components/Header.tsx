import { styled } from "styled-components";
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Link, useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAtom, loggedInUserAtom } from "../atoms";
import { useEffect } from "react";
import { userInfoApi } from "../apis";

const Header = () => {
    const dashboardMatch = useMatch('/dashboard');
    const tradingMatch = useMatch('/trading/:coinId');
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserAtom);

    const handleAuthentication = (loginVal: boolean | null) => {
        // null 일때 popup login창이 내려감
        if (loginVal === null && window.confirm('로그아웃 하시겠습니까?')) {
            setIsLogin(null);
            sessionStorage.clear();
            window.alert('정상적으로 로그아웃 되었습니다.');
        }

        // false 일때 popup login창이 뜸
        if (loginVal === false) {
            setIsLogin(false);
        }
    }

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        if (userId) {
            userInfoApi.get(`/users/${userId}`)
            .then(response => {
                setLoggedInUser(response.data);
                // true 일때 popup login창이 내려가고 로그인 상태가 됨
                setIsLogin(true);
            })
            .catch(error => console.log(error))
        }
    }, []);


    return(
        <Container>
            <Nav>
                <Link to="/dashboard">
                    <Logo />
                </Link>
                <MenuLists>
                    <MenuItem $isActive={dashboardMatch !== null}>
                        <Link to="/dashboard">Dashboard</Link>
                    </MenuItem>
                    <MenuItem $isActive={tradingMatch !== null}>
                        <Link to="/trading/:coinId">Trading</Link>
                    </MenuItem>
                </MenuLists>
                <LoginInfo>
                    {isLogin ? (
                        <>
                            <UserName>{loggedInUser?.name}</UserName>
                            <BtnLogInOut onClick={() => handleAuthentication(null)}>Logout</BtnLogInOut>
                        </>
                    ) : <BtnLogInOut onClick={() => handleAuthentication(false)}>Login</BtnLogInOut>}
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