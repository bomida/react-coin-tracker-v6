import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { headerInfoAtom, HeaderInitialState, isDarkAtom } from "../atoms";

function Header() {
    const [isDark, setDark] = useRecoilState(isDarkAtom);
    const toggleTheme = () => setDark(prev => !prev);
    const headerInfo = useRecoilValue(headerInfoAtom);
    const setHeaderInfo = useSetRecoilState(headerInfoAtom);

    let navigate = useNavigate();
    const toBack = () => {
        navigate('/', { replace: true });
        setHeaderInfo(HeaderInitialState);
    };

    return(
        <Container>
            <HeaderDiv>
                <BtnBack onClick={toBack}>Back</BtnBack>
                <Title>
                    {headerInfo.id !== '' ? <img src={`https://cryptocurrencyliveprices.com/img/${headerInfo.id}.png`} alt={`symbol_${headerInfo.id}`} /> : null}
                    <span>{headerInfo.name}</span>
                </Title>

                <ToggleBtnInput type="checkbox" id="toggle_theme" onChange={toggleTheme}/>
                <ToggleBtnLabel htmlFor="toggle_theme">
                    <ToggleBtnSpan></ToggleBtnSpan>
                </ToggleBtnLabel>
            </HeaderDiv>
        </Container>
    );
}

const Container = styled.div`
    padding: 0 60px;
    background-color: ${props =>  props.theme.bgColor};
    box-shadow: 1px 1px 5px 1px #333;
`;
const HeaderDiv = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;
`;
const ToggleBtnLabel = styled.label`
    width: 36px;
    height: 16px;
    background-color: transparent;
    border: 2px solid ${props => props.theme.primary};
    border-radius: 14px;
    cursor: pointer;
`;
const ToggleBtnSpan = styled.span`
    display: inline-block;
    margin: 3px;
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
    transition: .2s ease-in-out;
`;
const ToggleBtnInput = styled.input`
    display: none;

    &:checked + ${ToggleBtnLabel} {
        text-align: right;
    }
`;

const BtnBack = styled.button`
    padding: 5px 14px;
    color: ${props => props.theme.primary};
    font-size: 13px;
    border-radius: 4px;
    background-color: transparent;
    border: 1px solid ${props => props.theme.primary};
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.primaryHover};
        border-color: ${props => props.theme.primaryHover};
    }
`;

const Title = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    font-size: 30px;
    text-align: center;
    text-transform: uppercase;

    img {
        margin-right: 10px;
        width: 32px;
    }
`;

interface RouteState {
    state: {
        id: string;
        name: string;
    }
}

export default Header;