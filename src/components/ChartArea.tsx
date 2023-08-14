import * as boardSt from '../pages/trading/Tradingboard.style';
import { useQuery } from "react-query";
import { styled } from "styled-components";
import ApexCharts from "react-apexcharts";

import { IOhlcv, PriceInfo, fetchoOhlcvData } from "../apis";
import { any } from 'prop-types';

interface CoinIdProp {
    id: string | undefined;
}

const ChartArea:React.FC<CoinIdProp> = ({id: coinId}) => {
    let valCoinId = Object.values({coinId})[0];
    const {isLoading, data, error} = useQuery<IOhlcv[]>(['chartData', valCoinId], () => fetchoOhlcvData(valCoinId!));

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMTHING HAS BEEN WRONG ;(';

    const convertData = (ohlc: IOhlcv) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[new Date(ohlc.time_open * 1000).getMonth() - 1];
        const date = new Date(ohlc.time_open * 1000).getDate();
        
        return {
            x: `${month}.${date}`,
            y: [ohlc.open.toLocaleString(), ohlc.high.toLocaleString(), ohlc.low.toLocaleString(), ohlc.close.toLocaleString()],
        }
    }

    let chartData: any[] = [];

    if (data) {
        chartData = data.map(convertData);
    }

    return (
        <ChartWrap>
            {isLoading
                ? <boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>
                : <ApexCharts
                    type='candlestick'
                    height= '300rem'
                    series={[{ 
                            data: chartData
                        }]}
                    options={{
                        theme: {mode: 'dark'},
                        chart: {
                            toolbar: {
                                show: false
                            },
                            background: 'transparent',
                        },
                        stroke: {width: 1},
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: '#4D8863',
                                    downward: '#DE6453'
                                },
                            }
                        },
                        xaxis: {
                            labels: {
                                style: { colors: "#999999" },
                            },
                            axisBorder: {
                                color: '#333333'
                            }
                        },
                        yaxis: {
                            labels: {
                                style: { colors: "#999999" }
                            }
                        },
                        grid: {
                            borderColor: '#333333'
                        }
                    }}
                />
            }
        </ChartWrap>
    );
}

const ChartWrap = styled.div`
    overflow: hidden;
    height: 300rem;
    /* background-color: ${props => props.theme.colors.primaryTxt}; */
`;

export default ChartArea;