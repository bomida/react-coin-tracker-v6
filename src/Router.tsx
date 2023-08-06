import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Coinboard from "./pages/dashboard/Coinboard";
import TradingBoard from "./pages/trading/TradingBoard";
import RightPanelCoins from "./pages/trading/RightPanel_Coins";
import RightPanelTrading from "./pages/trading/RightPanel_Trading";

function router() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Coinboard />} />
                <Route path="/trading/:coinId" element={<TradingBoard />}>
                    {/* <Route path="coins" element={<RightPanelCoins />} />
                    <Route path="detail" element={<RightPanelTrading />} /> */}
                </Route>
            </Routes>






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


export default router;