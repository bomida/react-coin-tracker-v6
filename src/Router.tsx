import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Coins from "./components/Coins";
import Coin from "./components/Coin";
import Chart from "./components/Chart";
import Price from "./components/Price";


function router() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Coins />} />
                <Route path="/:coinId/*" element={<Coin />}>
                    <Route path="chart" element={<Chart />} />
                    <Route path="price" element={<Price />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default router;