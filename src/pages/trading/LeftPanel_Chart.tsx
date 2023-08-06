import * as boardSt from './Tradingboard.style';
import { useQuery } from "react-query";
import { ICoins, PriceInfo, fetchPriceData } from "../../apis";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';


const LeftPanelChart:React.FC = () => {
    const { coinId } = useParams<{coinId?: string}>();
const updateCoinId = () => fetchPriceData(coinId!);
    const {isLoading, data: TChartData, error} = useQuery<PriceInfo | undefined>(['tradingChart', coinId], updateCoinId);

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMTHING HAS BEEN WRONG ;(';

    return(
        <>
            {/* <boardSt.LoadingMsg><p>{coinId}</p></boardSt.LoadingMsg> */}
            {isLoading
                ? <boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>
                : <boardSt.Container>
                    <ChartTitleWrapper>
                        <div>
                            <h4>{TChartData?.name}</h4>
                            <p>{TChartData?.symbol}</p>
                        </div>
                        <BtnTrade>TRADE</BtnTrade>
                    </ChartTitleWrapper>
                    <ChartWrapper>
                        <CurrentPrice>$ {TChartData?.quotes.USD.price.toLocaleString()}<span>USD</span></CurrentPrice>
                        <VolumData>Vol_24h: {TChartData?.quotes.USD.volume_24h.toLocaleString()} <span>({TChartData?.quotes.USD.volume_24h_change_24h}%)</span></VolumData>
                        <ChartArea>{TChartData?.name}<br/>Chart Area</ChartArea>
                    </ChartWrapper>
                    <ChartBottWrapper></ChartBottWrapper>
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
    padding: 30rem 0;
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
const VolumData = styled.p`
    margin: 20rem 0 30rem;
    color: ${props => props.theme.colors.nine};
    font-size: ${props => props.theme.fontSize.rg};
    font-weight: 400;
`;
const ChartArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.3;
    color: #141518;
    font-size: ${props => props.theme.fontSize.xxl};
    font-weight: 600;
    text-align: center;
    background-color: ${props => props.theme.colors.primaryTxt};

    height: 353rem;
`;

const ChartBottWrapper = styled.div`
    border-top: 1px solid ${props => props.theme.colors.three};
`;

export default LeftPanelChart;