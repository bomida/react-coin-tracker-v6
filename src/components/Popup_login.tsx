import { useSetRecoilState } from "recoil";
import { isLoginAtom } from "../atoms";
import * as boardSt from "../pages/trading/Tradingboard.style";
import { styled } from "styled-components";

const PopupLogin = () => {
    const setIsLogin = useSetRecoilState(isLoginAtom);


    return(
        <PopupContainer>
            <PopupDiv>
                <LoginHead>Login</LoginHead>
                <LoginInput type='text' placeholder="ID" />
                <LoginInput type='password' placeholder="Password" />
                <SubmitLogin>Login</SubmitLogin>
            </PopupDiv>
            <ClosePopup onClick={() => setIsLogin(null)}>로그인하지 않고 둘러보기</ClosePopup>
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