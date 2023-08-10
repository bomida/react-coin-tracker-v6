import * as boardSt from './Tradingboard.style';
import RightPanelCoins from './RightPanel_Coins';
import LeftPanelChart from './LeftPanel_Chart';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ICoins, fetchCoins } from '../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IHeader, headerInfoAtom, isTradePanelOpen } from '../../atoms';
import { styled } from 'styled-components';
import RightPanelTrade from './RightPanel_Trade';

const TradingBoard: React.FC = () => {
    const isTradePanel = useRecoilValue(isTradePanelOpen);
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
                <LeftPanelChart />
            </boardSt.Panel>
            <RightPanel>
                {isLoading
                    ? <boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>
                    : (isTradePanel 
                        ? <RightPanelTrade />
                        : <RightPanelCoins data={tradingCoinsData} loading={isLoading} message={message} />)
                }
            </RightPanel>
        </boardSt.Wrap>
    );
}

const RightPanel = styled(boardSt.Panel)`
    background-color: ${props => props.theme.colors.primary};
`;

export default TradingBoard