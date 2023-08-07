import { useQuery } from "react-query";
import { fetchoOhlcvData } from "../apis";
import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

function Chart() {
    const isDark = useRecoilValue(isDarkAtom);
    const {coinId} = useOutletContext<CoinIdContext>();
    const {isLoading, data} = useQuery<IOhlcv[]>('ohlcv', () => fetchoOhlcvData(coinId));
    const convertPriceData = (price: [] | any) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        return {
            x: `${months[new Date(price.time_close * 1000).getMonth() - 1]}.${new Date(price.time_close * 1000).getDate()}`,
            y: [
                parseFloat(price.open),
                parseFloat(price.high),
                parseFloat(price.low),
                parseFloat(price.close),
            ]};
    };
    
    let transformedData: any[] = [];
    
    if (Array.isArray(data)) {
        // data가 배열인 경우
        transformedData = data.map(convertPriceData);
    } else if (typeof data === 'object') {
        // data가 객체인 경우
        transformedData = Object.keys(data).map((key) => convertPriceData(data[key]));
    } else {
        console.error('Invalid data format. Expected an array or object.');
    }

    return(
        <ChartContainer>
            {isLoading ? <Loading>Loading...</Loading> : (
                <>
                    <ApexCharts  type="candlestick" 
                        series={[
                            {
                                data: transformedData,
                            },
                        ]}
                        options={{
                            theme: {mode: isDark ? "dark" : "light"},
                            chart: {
                                height: 300,
                                toolbar: {
                                    show: false
                                },
                                background: "transparent",
                            },
                            plotOptions: {
                                candlestick: {
                                    colors: {
                                        upward: '#B8F1B0',
                                        downward: '#FAE392'
                                    },
                                    wick: {
                                        useFillColor: true,
                                    }
                                }
                            },
                            grid: {
                                borderColor: '#072642'
                            }
                        }}
                    />
                </>
            )}
        </ChartContainer>
    );
}

const ChartContainer = styled.div`
    margin: 50px auto 50px;
    width: 80%;
`;

const Loading = styled.p`
    margin-top: 50px;
    font-size: 18px;
    text-align: center;
`;

interface CoinIdContext {
    coinId: string;
}

interface IOhlcv {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: string;
}
export default Chart;