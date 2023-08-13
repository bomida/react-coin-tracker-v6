import * as boardSt from './Tradingboard.style';
import RightPanelCoins from './RightPanel_Coins';
import LeftPanelChart from './LeftPanel_Chart';
import RightPanelTrade from './RightPanel_Trade';
import PopupLogin from '../../components/Popup_login';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ICoins, fetchCoins } from '../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginAtom, isTradePanelOpen } from '../../atoms';


const TradingBoard: React.FC = () => {
    const isLogin = useRecoilValue(isLoginAtom);
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

            {/* 거래 버튼 클릭 햇을 때 isLogin 조회 / 로그인 상태가 false면 팝업 / 로그인 상태가 true면 팝업 띄윚 않기 */}
            {isLogin && <PopupLogin />}
        </boardSt.Wrap>
    );
}

const RightPanel = styled(boardSt.Panel)`
    background-color: ${props => props.theme.colors.primary};
`;

export default TradingBoard