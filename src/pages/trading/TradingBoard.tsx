import RightPanelCoins from './RightPanel_Coins';
import * as boardSt from './Tradingboard.style';

function TradingBoard() {
    return (
        <boardSt.Wrap>
            <boardSt.Panel>
                오른쪽 리스트에서 가져온 정보들을 가지고 
                차트를 만들어 보여주는 곳
                - 거래 버튼을 누르면 오른쪽 리스트에서 결재를 할 수 있는 판넬이 나온다.
            </boardSt.Panel>
            <boardSt.Panel>
                {/* 코인 리스트를 보여주는 곳
                - 디폴트 값은 랭크 1번이다. */}
                <RightPanelCoins />
            </boardSt.Panel>
        </boardSt.Wrap>
    );
}

export default TradingBoard