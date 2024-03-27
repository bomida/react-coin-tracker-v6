import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import PopupLogin from "./components/Popup_login";
import Coinboard from "./pages/dashboard/Coinboard";
import TradingBoard from "./pages/trading/TradingBoard";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "./atoms";

function Router() {
    const isLogin = useRecoilValue(isLoginAtom);

    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header />
            <Routes>
                <Route path="/" element={<Coinboard />} />
                <Route path="/trading/:coinId" element={<TradingBoard />}>
                    {/* <Route path="coins" element={<RightPanelCoins />} />
                    <Route path="detail" element={<RightPanelTrading />} /> */}
                </Route>
            </Routes>
            {/* 
                원래 상태 null
                거래 버튼 클릭 햇을 때 isLogin 조회 
                    - 로그인 상태가 false면 팝업
                    - 로그인 상태가 true면 팝업 띄우지 않기
                Gng에 login 버튼 눌렀을 때 isLogin 조회
            */}
            {isLogin === false && <PopupLogin />}



            {/* <Routes>
                <Route path="/" element={<Coins />} />
                <Route path="/:coinId/*" element={<Coin />}>
                    <Route path="chart" element={<Chart />} />
                    <Route path="price" element={<Price />} />
                </Route>
            </Routes> */}
        </BrowserRouter>
    );
}


export default Router;