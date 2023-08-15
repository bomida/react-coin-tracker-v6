import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style";
import ProfileAssets from "./ProfileAssets";
import ProfileBalance from "./ProfileBalance";
import { useRecoilValue } from "recoil";
import { isLoginAtom, loggedInUserAtom } from "../../atoms";
import { useQuery } from "react-query";
import { ICoins, PriceInfo, fetchPriceData } from "../../apis";
import { useEffect, useRef, useState } from "react";


export interface IMyCoins {
    id: string;
    name: string;
    symbol: string;
    quantity: number;
    amount: number;
    change: number;
}


function Profile() {
    const isLogin = useRecoilValue(isLoginAtom);
    // assets
    let [newProfileData, setNewProfileData] = useState<IMyCoins[]>([]);
    const loggedInUser = useRecoilValue(loggedInUserAtom);
    
    let portfolio = loggedInUser ? loggedInUser.portfolio.map((myCoinId) => myCoinId.coinId) : [];
    const { isLoading, data: assetsData } = useQuery<PriceInfo[]>(['assetsCoins'],
        async () => {
            return Promise.all(portfolio
                .filter((coinId): coinId is string => typeof coinId === "string")
                .map((coinId) => fetchPriceData(coinId))
            );
        }, {
            enabled: !!portfolio.length,
            staleTime: 1000 * 60 * 10, // api block을 막기위해 캐시 만료 기간을 10분으로 설정
        }
    );
    console.log(!isLoading && assetsData);
    console.log(loggedInUser?.portfolio);

    useEffect(() => {
        if (!isLoading) {
            loggedInUser?.portfolio.forEach(myCoin => {
                const assetData = assetsData?.find((data) => data.id === myCoin.coinId);
                console.log(assetsData?.find((data) => data.id === myCoin.coinId));
                
                if (assetData) {
                    const id = assetData.id;
                    const name = assetData.name;
                    const symbol = assetData.symbol;
                    const quotesAmt = assetData.quotes.USD.price;
                    const quantity = myCoin.quantity;
                    const amount = quantity * quotesAmt;
                    const tradedAmt = myCoin.traded_amt;
                    const change = ((quotesAmt - tradedAmt) / tradedAmt) * 100;
                    console.log(quantity)
                    console.log(quotesAmt)
                    console.log(tradedAmt)

                    let newData: IMyCoins = {
                        id: id,
                        name: name,
                        symbol: symbol,
                        quantity: quantity,
                        amount: amount,
                        change: change
                    }

                    if (!newProfileData.find(item => item.id === newData.id)) {
                        setNewProfileData(prev => [...prev, newData]);
                    }
                }
            });
        }
    }, [isLoading, loggedInUser, assetsData, newProfileData, isLogin]);

    return (
        <boardSt.Container>
            <boardSt.PanelHead>Profile</boardSt.PanelHead>
            <ProfilePanel>
                <ProfileAssets newProfileData={newProfileData} isLogin={isLogin} />
                <ProfileBalance isLogin={isLogin} />
            </ProfilePanel>
        </boardSt.Container>
    );
}

const ProfilePanel = styled(boardSt.Panel)`
    width: 394rem;
    height: calc(100% - 42rem);
`;

export default Profile;