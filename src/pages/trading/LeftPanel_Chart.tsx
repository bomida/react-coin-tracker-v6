import * as boardSt from './Tradingboard.style';
import { styled } from 'styled-components';
import { useQuery } from "react-query";
import { PriceInfo, fetchPriceData } from "../../apis";
import { useParams } from 'react-router-dom';
import ChartArea from '../../components/ChartArea';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isTradePanelOpen, isCoinPriceAtom } from '../../atoms';
import { ButtonHTMLAttributes } from 'react';


const LeftPanelChart:React.FC = () => {
    const { coinId } = useParams<{coinId?: string}>();
    const setCoinPrice = useSetRecoilState(isCoinPriceAtom);
    const setTogglePanel = useSetRecoilState(isTradePanelOpen);
    const {isLoading, data: tradeData, error} = useQuery<PriceInfo | undefined>(['tradingData', coinId], () => fetchPriceData(coinId!));
    
    const clickChangePanel = (coinPrice: any) => {
        setTogglePanel((prev:boolean) => !prev);
        setCoinPrice(coinPrice);
    }

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMTHING HAS BEEN WRONG ;(';

    return(
        <>
            {isLoading
                ? <boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>
                : <boardSt.Container>
                    <ChartTitleWrapper>
                        <div>
                            <h4>{tradeData?.name}</h4>
                            <p>{tradeData?.symbol}</p>
                        </div>
                        <BtnTrade onClick={() => clickChangePanel(tradeData?.quotes.USD.price)}>TRADE</BtnTrade>
                    </ChartTitleWrapper>
                    <ChartWrapper>
                        <CurrentPrice>$ {tradeData?.quotes.USD.price.toLocaleString()}<span>USD</span></CurrentPrice>
                        <ChartSearchPeriod>
                            <li>1H</li>
                            <li>1D</li>
                            <li>1W</li>
                            <li>1Y</li>
                            <li>ALL</li>
                        </ChartSearchPeriod>
                    </ChartWrapper>
                    <ChartArea coinId={coinId} />
                    <ChartBottWrapper>
                        <ul>
                            <li>
                                <PriceLabel>all tile price</PriceLabel>
                                <PriceText>$ {tradeData?.quotes.USD.ath_price.toLocaleString()}<span>USD</span></PriceText>
                            </li>
                            <li>
                                <PriceLabel>market cap</PriceLabel>
                                <PriceText>$ {tradeData?.quotes.USD.market_cap.toLocaleString()}<span>USD</span></PriceText>
                            </li>
                            <li>
                                <PriceLabel>circulating supply</PriceLabel>
                                <PriceText>$ {tradeData?.circulating_supply.toLocaleString()}<span>USD</span></PriceText>
                            </li>
                            <li>
                                <PriceLabel>volume</PriceLabel>
                                <PriceText>$ {tradeData?.quotes.USD.volume_24h.toLocaleString()}<span>USD</span></PriceText>
                            </li>
                        </ul>
                    </ChartBottWrapper>
                </boardSt.Container>
            }
        </>
    );
}

const ChartTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rem;
    border-bottom: 1px solid ${props => props.theme.colors.three};

    div {
        display: flex;
        align-items: flex-end;
        gap: 10rem;
    }
    div h4 {
        color: ${props => props.theme.colors.ddd};
        font-size: ${props => props.theme.fontSize.xl};
        font-weight: 600;
    }
    div p {
        padding-bottom: 1rem;
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.rg};
    }
`;
const BtnTrade = styled.button`
    padding: 0 16rem;
    color: ${props => props.theme.colors.nine};
    font-size: ${props => props.theme.fontSize.sm};
    background-color: unset;
    border: 1px solid ${props => props.theme.colors.nine};
    border-radius: 15rem;
    transition: .2s ease-in-out;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colors.primaryTxt};
        background-color: ${props => props.theme.colors.primary};
        border: 1px solid ${props => props.theme.colors.primary};
    }
`;

const ChartWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 30rem 0 20rem;
`;
const CurrentPrice = styled.h3`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.xxl};
    font-weight: 600;

    span {
        margin-left: 10rem;
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.rg};
        font-weight: 400;
    }
`;
const ChartSearchPeriod = styled.ul`
    display: flex;
    gap: 30rem;
    margin-bottom: 2rem;

    li {
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.rg};
        transition: .2s ease-in-out;
        cursor: pointer;
    }
    
    li:hover {
        color: ${props => props.theme.colors.white};
    }
`;

const ChartBottWrapper = styled.div`
    margin-top: 30rem;
    padding-top: 35rem;
    border-top: 1px solid ${props => props.theme.colors.three};

    ul {
        /* display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 20rem 100rem;
        margin-right: 400rem; */
        display: flex;
        justify-content: space-between;

        li {
            position: relative;
            padding-left: 15rem;

            &::before {
                content: "";
                position: absolute;
                left: 0;
                width: 2rem;
                height: 100%;
                background-color: ${props => props.theme.colors.three};
            }
        }
    }
`;
const PriceLabel = styled.span`
    width: 135rem;
    text-transform: uppercase;
    color: ${props => props.theme.colors.nine};
    font-size: ${props => props.theme.fontSize.sm};
`;
const PriceText = styled.p`
    margin-top: 10rem;
    color: ${props => props.theme.colors.ddd};
    font-size: ${props => props.theme.fontSize.rg};
    span {
        margin-left: 6rem;
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.sm};
    }
`;

export default LeftPanelChart;