import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import {Helmet} from "react-helmet";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinData, fetchPriceData } from "../apis";

function Coin() {

    const { coinId } = useParams() as unknown as RouteParams;
    const chartMatch = useMatch('/:coinId/chart');
    const priceMatch = useMatch('/:coinId/price');
    const {isLoading: coinLoading, data: coinData} = useQuery<InfoData>('coinData', () => fetchCoinData(coinId!));
    const {isLoading: priceLoading, data: priceData} = useQuery<PriceInfo>('priceData', () => fetchPriceData(coinId!));
    const isLoading = coinLoading || priceLoading;

    return(
        <>
            <Helmet>
                <title>{coinData?.name}</title>
                <meta name="description" content={coinData?.description} />
            </Helmet>
            {isLoading ? <Loading>Loading...</Loading> : (
                <>
                    <QuickInfo>
                        <p><b>Rank</b><br/>{coinData?.rank}</p>
                        <p><b>Date</b><br/>{coinData?.first_data_at.slice(0, 10)} ~ {coinData?.last_data_at.slice(0, 10)}</p>
                        <p><b>Total Supply</b><br/>{priceData?.total_supply}</p>
                    </QuickInfo>
                    <Description><b>Description</b><br/>{coinData?.description}</Description>
                    {/* <CoinVideo controls={true} playsInline={true} autoPlay={true}>
                        <source src={coinData?.links.youtube[0]} type="video/mp4"/>
                    </CoinVideo> */}

                    <Tabs>
                        <Tab $isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab $isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    <Outlet context={{usdPrice: priceData?.quotes.USD, coinId: coinId}}/>
                    {/* <Routes>
                        <Route path="chart" element={<Chart />} />
                        <Route path="price" element={<Price />} />
                    </Routes> */}
                </>
            )}
        </>
    );
}

const Tabs = styled.ul`
    display: flex;
    gap: 10px;
    margin: 0 auto;
    max-width: 80%;
`;
const Tab = styled.li<{$isActive: boolean}>`
    overflow: hidden;
    width: 100%;
    color: ${props => props.$isActive ? props.theme.primaryHover : props.theme.primary};
    font-size: 14px;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.$isActive ? props.theme.primaryHover : props.theme.primary};
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.primaryHover};
        border-color: ${props => props.theme.primaryHover};
    }

    a {
        display: block;
        padding: 10px;
    }
`;

const QuickInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 50px auto;
    width: 100%;
    max-width: 80%;
    p {
        font-size: 14px;
        text-align: center;
        
        b {
            font-size: 12px;
            line-height: 2;
        }
    }
`;

const Description = styled.p`
    margin: 0 auto 60px;
    max-width: 80%;
    font-size: 14px;
    line-height: 1.5;

    b {
        font-size: 12px;
        line-height: 2;
    }
`;

const CoinVideo = styled.video`
    margin-bottom: 60px;
    width: 100%;
`;


const Loading = styled.p`
    margin-top: 50px;
    font-size: 18px;
    text-align: center;
`;


interface RouteParams {
    coinId: string;
}
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: {
        youtube: string,
    },
    first_data_at: string;
    last_data_at: string;
}

interface PriceInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

export default Coin;