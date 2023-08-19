import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style";
import ApexCharts from "react-apexcharts";

const profileBalance:React.FC<boolean | any> = ({isLogin, chartData}) => {
    let message = '';
    if (!isLogin) message = '로그인 해주세요.';
    console.log(chartData.series)
    console.log(chartData.labels)

    return(
        <boardSt.Container>
            <boardSt.sectionTitle>Balance</boardSt.sectionTitle>
            <ChartWrapper>
                {!isLogin
                    ? <NoMyCoins><p>{message}</p></NoMyCoins>
                    : <DonutChart>
                        <ApexCharts
                            type='donut'
                            height='230rem'
                            options={{
                                theme: {mode: 'dark'},
                                chart: {
                                    toolbar: {
                                        show: false
                                    },
                                    background: 'transparent',
                                },
                                legend: {
                                    show: false,
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                tooltip: {
                                    enabled: false
                                },
                                stroke: {show: false},
                                plotOptions: {
                                    pie: {
                                        donut: {
                                            size: '93rem',
                                            labels: {
                                                show: false,
                                            },
                                        }
                                    }
                                }
                            }}
                            series={chartData.series}
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