import { atom } from "recoil";

export const isSubscribeAtom = atom<string[]>({
    key: 'isSubscribe',
    default: [],
});

export const isTradePanelOpen = atom({
    key: 'isTradePanelOpen',
    default: false,
});


export const isCoinPriceAtom = atom({
    key: 'isCoinPrice',
    default: 0,
})

export const isLoginAtom = atom<boolean | null>({
    key: 'isLogin',
    default: null,
});

export const loggedInUserAtom = atom<IUserInfo | null>({
    key: 'loggedInUser',
    default: null,
});

// getLoginInfo
interface IPortfolioItem {
    coinId: string;
    quantity: number;
    amount: number;
    traded_amt: number;
}

interface ISubscribeItem {
    coinId: string;
}

export interface IUserInfo {
    id: string;
    password: string;
    name: string;
    account: number;
    portfolio: IPortfolioItem[];
    subscribe: ISubscribeItem[];
}



export const isDarkAtom = atom({
    key: 'isDark',
    default: true
});

export const headerInfoAtom = atom<IHeader>({
    key: 'headerInfo',
    default: {
        id: '',
        name: 'coin tracker'
    }
});

export const  HeaderInitialState: IHeader = {
    id: '',
    name: 'Coin Tracker',
};

export interface IHeader {
    id: string;
    name: string;
}