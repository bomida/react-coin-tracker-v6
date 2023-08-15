import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style";

const profileBalance:React.FC<boolean | any> = ({isLogin}) => {
    let message = '';
    if (!isLogin) message = '로그인 해주세요.';

    return(
        <boardSt.Container>
            <boardSt.sectionTitle>Balance</boardSt.sectionTitle>
            <ChartWrapper>
                {!isLogin
                    ? <NoMyCoins><p>{message}</p></NoMyCoins>
                    : <DonutChart>
                        <span>Profit</span>
                        <p>$234,734</p>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    margin: 35rem auto 0;
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
    }
`;

export default profileBalance;