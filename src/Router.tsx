import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Coinboard from "./pages/dashboard/Coinboard";

function router() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Coinboard />} />
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