import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style";
import { IMyCoins } from "./Profile";
import { useRecoilValue } from "recoil";


const profileAssets:React.FC<IMyCoins | any | boolean> = ({newProfileData, isLogin}) => {
    let message = '';
    if (newProfileData.length === 0) message = '보유한 코인이 없습니다.';
    if (!isLogin) message = '로그인 해주세요.';

    return(
        <boardSt.Container>
            <boardSt.sectionTitle>My Assets</boardSt.sectionTitle>
            <AssetsLists>
                {newProfileData.length === 0
                    ? <NoMyCoins><p>{message}</p></NoMyCoins>
                    : newProfileData.map((myCoin: IMyCoins) => (
                        <AssetsItem key={myCoin.id}>
                            <InfoWrapper>
                                <MyCoinName>{myCoin.name}<span>{myCoin.symbol}</span></MyCoinName>
                                <MyCoinAmount>{myCoin.quantity}<span>{myCoin.symbol}</span></MyCoinAmount>
                            </InfoWrapper>
                            <InfoWrapper>
                                <ProfitRate $rateStatus={myCoin.change > 0 ? true : false}>{myCoin.change}%</ProfitRate>
                                <ProfitAmount>${Number(myCoin.amount).toLocaleString()}</ProfitAmount>
                            </InfoWrapper>
                        </AssetsItem>
                ))}
                </AssetsLists>
        </boardSt.Container>
    );
}

const NoMyCoins = styled(boardSt.LoadingMsg)`
`;

const AssetsLists = styled.ul`
    overflow-y: scroll;
    margin: 15rem 0 25rem;
    height: 192rem;
`;
const AssetsItem = styled.li`
    display: flex;
    flex-direction: column;
    gap: 6rem;
    padding: 15rem;
    border-radius: 15rem;
    transition: all .3s ease-in-out;
`;
const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;
const MyCoinName = styled.h5`
    font-size: ${props => props.theme.fontSize.md};
    font-weight: 600;

    span {
        margin-left: 4rem;
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.sm};
        font-weight: 400;
    }
`;
const MyCoinAmount = styled.p`
    font-size: ${props => props.theme.fontSize.md};
    font-weight: 500;

    span {
        margin-left: 4rem;
    }
`;
const ProfitRate = styled.p<{$rateStatus: boolean}>`
    color: ${props => props.$rateStatus ? props.theme.colors.green : props.theme.colors.red};
    font-size: ${props => props.theme.fontSize.sm};
`;
const ProfitAmount = styled.p`
    color: ${props => props.theme.colors.nine};
    font-size: ${props => props.theme.fontSize.sm};
    font-weight: 400;
`;

export default profileAssets;