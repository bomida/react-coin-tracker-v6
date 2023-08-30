import { useRecoilState, useSetRecoilState } from "recoil";
import { IUserInfo, isLoginAtom, loggedInUserAtom } from "../atoms";
import * as boardSt from "../pages/trading/Tradingboard.style";
import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { userInfoApi } from "../apis";


const PopupLogin = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo[] | null>(null);
    const [idValue, setIdValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const setLoggedInUser = useSetRecoilState<IUserInfo | null>(loggedInUserAtom);

    // 로그인 정보 체크
    const clickUserInfoCheck = (e?: React.MouseEvent<HTMLButtonElement>) => {
        let id = '';
        let password = '';
        let loggedInUserInfo: IUserInfo | null = null;

        if (userInfo !== null) {
            for (let info of userInfo) {
                if (info.id === idValue && info.password === passwordValue) {
                    id = info.id;
                    password = info.password;
                    loggedInUserInfo = info;
                    break;
                }
            }
        }

        if (!isLogin && (id === idValue && password === passwordValue)) {
            setLoggedInUser(loggedInUserInfo);
            setIsLogin(true);

            sessionStorage.clear();
            sessionStorage.setItem('userId', id);
        }

        if (e) e.preventDefault();
    }

    const keyUpCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let key = e.key;
        if (key === "Enter") clickUserInfoCheck();
    }

    useEffect(() => {
        userInfoApi.get('/users')
        .then(response => setUserInfo(response.data))
        .catch(error => console.error(error));
    } ,[]);


    return(
        <PopupContainer>
            <PopupDiv>
                <LoginHead>Login</LoginHead>
                <LoginInput type='text' value={idValue} onChange={e => setIdValue(e.target.value)} onKeyUp={keyUpCheck} placeholder="ID" autoFocus />
                <LoginInput type='password' value={passwordValue} onChange={e => setPasswordValue(e.target.value)} onKeyUp={keyUpCheck} placeholder="Password" />
                <SubmitLogin onClick={clickUserInfoCheck}>Login</SubmitLogin>
            </PopupDiv>
            <ClosePopup type="submit" onClick={() => setIsLogin(null)}>로그인하지 않고 둘러보기</ClosePopup>
        </PopupContainer>
    );
}

const SubmitLogin = styled.button`
    margin-top: 30rem;
    padding: 13rem;
    color: ${props => props.theme.colors.nine};
    font-size: ${props => props.theme.fontSize.rg};
    font-weight: 600;
    background-color: ${props => props.theme.colors.primaryTxt};
    border-radius: 20rem;
    transition: all .2s ease-in-out;
    cursor: pointer;
    
    &:hover {
        color: ${props => props.theme.colors.primaryTxt};
        background-color: ${props => props.theme.colors.primary};
    }
`;
const LoginInput = styled.input`
    padding: 14rem;
    width: 386rem;
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.rg};
    background-color: transparent;
    border-radius: 10rem 12rem;
    border: 1px solid #999;
    transition: all .2s ease-in-out;

    &:focus {
        color: ${props => props.theme.colors.primary};
        border-color: ${props => props.theme.colors.primary};
    }

    &::placeholder {
        color: ${props => props.theme.colors.nine};
    }

    &[type=password] {
        font-family: Verdana;
        letter-spacing: 0.125rem;
    }
`;
const LoginHead = styled(boardSt.PanelHead)`
    text-align: center;
`;
const PopupDiv = styled(boardSt.Panel)`
    display: flex;
    flex-direction: column;
    gap: 25rem;
    height: fit-content;
`;

const ClosePopup = styled.button`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.sm};
    background-color: transparent;
    cursor: pointer;
`;
const PopupContainer = styled(boardSt.Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10rem;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
    background-color: #00000095;
`;

export default PopupLogin;