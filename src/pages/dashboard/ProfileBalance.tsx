import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style";
import ApexCharts from "react-apexcharts";

const profileBalance:React.FC<boolean | any> = ({isLogin, chartData}) => {
    let message = '';
    if (!isLogin) message = '로그인 해주세요.';

    return(
        <boardSt.Container>
            <boardSt.sectionTitle>Balance</boardSt.sectionTitle>
            <ChartWrapper>
                {!isLogin
                    ? <NoMyCoins><p>{message}</p></NoMyCoins>
                    : <DonutChart>
                        <ApexCharts
                            type='donut'
                            height='250rem'
                            series={chartData.series}
                            options={{
                                theme: {mode: 'dark'},
                                labels: chartData.categories,
                                chart: {
                                    toolbar: {
                                        show: false
                                    },
                                    background: 'transparent',
                                    events: {
                                        dataPointMouseEnter: (event, chartContext, config) => {
                                            let gs = document.querySelectorAll('.apexcharts-pie-series');
                                            let path = gs[config.dataPointIndex].firstChild as SVGElement;
                                            if (path) path.style.fill = '#E2E247';
                                        },
                                        dataPointMouseLeave(event, chartContext, config) {
                                            let gs = document.querySelectorAll('.apexcharts-pie-series');
                                            let path = gs[config.dataPointIndex].firstChild as SVGElement;
                                            if (path) path.style.fill = '';
                                        },
                                    }
                                },
                                colors: ['#999999' ,'#999999'],
                                states: {
                                    hover: {
                                        filter: {type: 'none'}
                                    }
                                },
                                legend: {show: false},
                                dataLabels: {enabled: false},
                                tooltip: {enabled: false},
                                stroke: {
                                    show: true,
                                    width: 1.5,
                                    colors: ['#222327']
                                },
                                plotOptions: {
                                    pie: {
                                        expandOnClick: false,
                                        donut: {
                                            size: '93rem',
                                            labels: {
                                                show: true,
                                                total: {
                                                    show: true,
                                                    fontFamily: 'Montserrat, sans-serif',
                                                    fontSize: '12rem',
                                                    fontWeight: 400,
                                                    color: '#999999',
                                                    // showAlways: true,
                                                    label: 'Total',
                                                    formatter: (val) => {
                                                        return val.config?.series.reduce((a:number, b:number) => {
                                                            let result = a + b
                                                            return `$${result.toLocaleString()}`
                                                        });
                                                    },
                                                },
                                                value: {
                                                    show: true,
                                                    offsetY: 3,
                                                    fontSize: '24rem',
                                                    fontWeight: 600,
                                                    fontFamily: 'Montserrat, sans-serif'
                                                }
                                            },
                                        }
                                    }
                                }
                            }}
                        />
                    </DonutChart>
                }
                </ChartWrapper>
        </boardSt.Container>
    );
}
const NoMyCoins = styled(boardSt.LoadingMsg)`
`;
const ChartWrapper = styled(boardSt.Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 300rem);
    min-height: 200rem;
`;
const DonutChart = styled.div`
    margin: 25rem auto 0;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    width: 200rem;
    height: 200rem;
    border: 7px solid ${props => props.theme.colors.primary};
    border-radius: 50%;

    span {
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.sm};
    }

    p {
        font-size: ${props => props.theme.fontSize.xl};
        font-weight: 600;
    } */
`;

export default profileBalance;