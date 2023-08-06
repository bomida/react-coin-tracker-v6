import { useQuery } from "react-query";
import { ICoins, fetchCoins } from "../../apis";
import * as boardSt from './Tradingboard.style'
import { styled } from "styled-components";

function RightPanelCoins() {
    const {isLoading, data:tradingCoinsData, error} = useQuery<ICoins[]>(['TradingCoins'], fetchCoins);

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMTHING HAS BEEN WRONG ;(';

    return(
        <CoinLists>
            {isLoading
                ? <boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>
                : tradingCoinsData?.slice(0, 50).map((tCoin) => (
                    <li key={tCoin.id}>{tCoin.name}</li>
                ))
            }
        </CoinLists>
    );
}

const CoinLists = styled.ul`
    overflow-y: scroll;
    height: 100%;

    li {
        margin-bottom: 12rem;
        padding: 14rem 15rem;
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.rg};
        border: 1px solid ${props => props.theme.colors.nine};
        border-radius: 10rem;
        transition: all .2s ease-in-out;
        cursor: pointer;
    }
    li:hover {
        color: ${props => props.theme.colors.white};
        border-color: ${props => props.theme.colors.white};
    }
`;

export default RightPanelCoins;