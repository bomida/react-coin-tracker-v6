import * as boardSt from './Tradingboard.style';
import RightPanelCoins from './RightPanel_Coins';
import LeftPanelChart from './LeftPanel_Chart';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ICoins, fetchCoins } from '../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { IHeader, headerInfoAtom } from '../../atoms';
import { styled } from 'styled-components';

const TradingBoard: React.FC = () => {
    const {isLoading, data:tradingCoinsData, error} = useQuery<ICoins[] | undefined>(['TradingCoins'], fetchCoins);
    const navigate = useNavigate();
    const { coinId } = useParams<{coinId?: string}>();
    const [firstDataId, setFirstDataId] = useState<string | undefined>(coinId);

    useEffect(() => {
        if (!isLoading && tradingCoinsData) {
            const settingId = tradingCoinsData?.[0]?.id;
            if (firstDataId === coinId) {
                navigate(`/trading/${settingId}`);
                setFirstDataId(settingId);
            }
        }
    }, [isLoading ,error ,tradingCoinsData, navigate, firstDataId]);
    

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMTHING HAS BEEN WRONG ;(';

    return (
        <boardSt.Wrap>
            <boardSt.Panel>
                {/* 오른쪽 리스트에서 가져온 정보들을 가지고 차트를 만들어 보여주는 곳 -> 거래 버튼을 누르면 오른쪽 리스트에서 결재를 할 수 있는 판넬이 나온다. */}
                <LeftPanelChart />
            </boardSt.Panel>
            <RightPanel>
                {/* 코인 리스트를 보여주는 곳 -> 디폴트 값은 랭크 1번이다. */}
                {isLoading
                    ? <boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>
                    : <RightPanelCoins data={tradingCoinsData} loading={isLoading} message={message} />
                }
            </RightPanel>
        </boardSt.Wrap>
    );
}

const RightPanel = styled(boardSt.Panel)`
    background-color: ${props => props.theme.colors.primary};
`;

export default TradingBoard