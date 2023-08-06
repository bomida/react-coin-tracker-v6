import coinsBackupData from "./assets/data/data_coins.json";

let BASE_URL = 'https://api.coinpaprika.com/v1'
export let IMG_URL = 'https://cryptocurrencyliveprices.com/img/';

export function fetchCoins() {
    // return fetch(`${BASE_URL}/coins`).then((response) => response.json());
    return coinsBackupData;
}
export interface ICoins {
    "id": string;
    "name": string;
    "symbol": string;
    "rank": number;
    "is_new": boolean;
    "is_active": boolean;
    "type": string;
}

export function fetchCoinData(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export function fetchPriceData(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}
export interface PriceInfo {
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

export function fetchoOhlcvData(coinId: string) {
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then((response) => response.json());
}