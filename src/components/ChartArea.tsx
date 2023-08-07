import * as boardSt from '../pages/trading/Tradingboard.style';
import { useQuery } from "react-query";
import { styled } from "styled-components";
import ApexCharts from "react-apexcharts";

import { IOhlcv, PriceInfo, fetchoOhlcvData } from "../apis";

interface CoinIdProp {
    id: string | undefined;
}

const ChartArea:React.FC<CoinIdProp> = ({id: coinId}) => {
    let valCoinId = Object.values({coinId})[0];
    const {isLoading, data: chartData, error} = useQuery<IOhlcv[]>(['chartData', valCoinId], () => fetchoOhlcvData(valCoinId!));

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMTHING HAS BEEN WRONG ;(';

    return (
        <boardSt.Container>
            {isLoading
                ? <boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>
                : <ChartWrap>
                    {coinId}
                </ChartWrap>
            }
        </boardSt.Container>
    );
}

const ChartWrap = styled.div`
    overflow: hidden;
    height: 353rem;
    
    
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
    color: #141518;
    font-size: ${props => props.theme.fontSize.xxl};
    font-weight: 600;
    text-align: center;
    background-color: ${props => props.theme.colors.primaryTxt};
`;

export default ChartArea;