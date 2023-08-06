import React from "react";
import { ICoins } from "../../apis";
import * as boardSt from './Tradingboard.style'
import { styled } from "styled-components";
import { Link, useParams } from "react-router-dom";

export interface TradingProps {
    data: ICoins[] | undefined;
    loading: boolean;
    message: string;
}

const RightPanelCoins: React.FC<TradingProps> = ({data: tradingCoinsData, loading: isLoading, message: message}) => {
    const { coinId } = useParams<{coinId?: string | undefined}>();

    return(
        <RightContainer>
            <ListTitle>Coin List</ListTitle>
            <CoinLists>
                {isLoading
                    ? <boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>
                    : tradingCoinsData?.slice(0, 50).map((tCoin) => (
                        <CoinItem key={tCoin.id} $isSelect={tCoin.id === coinId}>
                            <Link to={`/trading/${tCoin.id}`}>{tCoin.name}</Link>
                        </CoinItem>
                    ))
                }
            </CoinLists>
        </RightContainer>
    );
}

const RightContainer = styled.div`
    height: 100%;
`;

const ListTitle = styled.h3`
    margin-bottom: 20rem;
    color: ${props => props.theme.colors.txtBlack};
    font-size: ${props => props.theme.fontSize.xl};
    font-weight: 500;
`;

const CoinLists = styled.ul`
    overflow-y: scroll;
    height: calc(100% - 44rem);
`;

const CoinItem = styled.li<{$isSelect: boolean}>`
    overflow: hidden;
    margin-bottom: 12rem;
    color: ${props => props.$isSelect ? props.theme.colors.primary : props.theme.colors.nine};
    background-color: ${props => props.$isSelect ? props.theme.colors.txtBlack : 'transparent'};
    border: 1px solid ${props => props.$isSelect ? props.theme.colors.txtBlack : props.theme.colors.nine};
    border-radius: 10rem;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
        color: ${props =>  props.$isSelect ? props.theme.colors.white : props.theme.colors.txtBlack};
        border-color: ${props =>  props.$isSelect ? props.theme.colors.txtBlack : props.theme.colors.txtBlack};
    }
    
    a {
        display: block;
        padding: 14rem 15rem;
        font-size: ${props => props.theme.fontSize.rg};
    }
`;

export default RightPanelCoins;