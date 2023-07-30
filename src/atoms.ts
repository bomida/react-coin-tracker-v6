import { atom } from "recoil";














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