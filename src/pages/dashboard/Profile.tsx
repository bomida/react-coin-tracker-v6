import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style";
import ProfileAssets from "./ProfileAssets";
import ProfileBalance from "./ProfileBalance";
import { useRecoilValue } from "recoil";
import { isLoginAtom, loggedInUserAtom } from "../../atoms";
import { useQuery } from "react-query";
import { ICoins, PriceInfo, fetchPriceData, userInfoApi } from "../../apis";
import { useEffect, useRef, useState } from "react";


export interface IMyCoins {
    id: string;
    name: string;
    symbol: string;
    quantity: number;
    amount: number;
    change: number;
}

const Profile = () => {
    const isLogin = useRecoilValue(isLoginAtom);
    const loggedInUser = useRecoilValue(loggedInUserAtom);

    // assets
    let [newProfileData, setNewProfileData] = useState<IMyCoins[]>([]);
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

    // balance
    // total assets (보유 현금 / 보유 중인 코인 전체 금액)
    const [totalCoinsAmount, setTotalCoinsAmount] = useState(0);
    const chartData = {
        categories: ['Account', 'Total amount of coins'],
        series: [loggedInUser?.account, totalCoinsAmount]
    }


    // coins balance (보유 중인 코인 지분)

    useEffect(() => {
        // assets
        if (!isLoading) {
            loggedInUser?.portfolio.forEach(myCoin => {
                const assetData = assetsData?.find((data) => data.id === myCoin.coinId);
                // console.log(assetsData?.find((data) => data.id === myCoin.coinId));
                
                if (assetData) {
                    const id = assetData.id;
                    const name = assetData.name;
                    const symbol = assetData.symbol;
                    const quotesAmt = assetData.quotes.USD.price;
                    const quantity = myCoin.quantity;
                    const amount = quantity * quotesAmt;
                    const tradedAmt = myCoin.traded_amt;
                    const change = ((quotesAmt - tradedAmt) / tradedAmt) * 100;

                    let newData: IMyCoins = {
                        id: id,
                        name: name,
                        symbol: symbol,
                        quantity: quantity,
                        amount: amount,
                        change: change
                    }

                    setNewProfileData(prevState => 
                        prevState.find(item => item.id === newData.id && item.quantity === newData.quantity)
                        ? prevState
                        : [...prevState, newData]
                    );
                }
            });
        }

        // balance
        if (isLogin && !isLoading) {
            if (loggedInUser) {
                let onwCoinsAmount = loggedInUser?.portfolio.map(coin => coin.amount);
                let plusAmount = onwCoinsAmount.length === 0 ? 0 : onwCoinsAmount.reduce((prev, curr) => prev + curr);
                let resultTotalAmount = Number(plusAmount.toFixed(5));
                setTotalCoinsAmount(resultTotalAmount);
            }
        }
    }, [isLoading, newProfileData, loggedInUser, assetsData, isLogin, chartData]);

    return (
        <boardSt.Container>
            <boardSt.PanelHead>Profile</boardSt.PanelHead>
            <ProfilePanel>
                <ProfileAssets newProfileData={newProfileData} isLogin={isLogin} />
                <ProfileBalance chartData={chartData} isLogin={isLogin} />
            </ProfilePanel>
        </boardSt.Container>
    );
}

const ProfilePanel = styled(boardSt.Panel)`
    width: 394rem;
    height: calc(100% - 42rem);
`;

export default Profile;