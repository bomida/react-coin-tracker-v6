import React, { useState } from 'react';
import * as boardSt from "./Coninboard.style"
import CoinPriceData from "./CoinPriceData";
import { useQuery } from 'react-query';
import { ICoins, PriceInfo, fetchCoins, fetchPriceData } from '../../apis';
import { styled } from 'styled-components';


export const Market = () => {
    const { isLoading, data: coins, error } = useQuery<ICoins[]>('coins', fetchCoins, {
        staleTime: 1000 * 60 * 5, // api block을 막기위해 캐시 만료 기간을 5분으로 설정
    });

    // const selectedCoinIds = coins?.slice(0, 8).map((coin) => coin.id) || [];
    // const { data: priceDataArray } = useQuery<PriceInfo[]>(['priceData'],
    //     async () => {
    //         return Promise.all(selectedCoinIds.map((coinId) => fetchPriceData(coinId)));
    //     }, {
    //         enabled: !!selectedCoinIds.length,
    //         staleTime: 1000 * 60 * 5, // api block을 막기위해 캐시 만료 기간을 5분으로 설정
    //     }
    // );

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMETHING HAS BEEN WRONG :(';

    return (
        <MarketContainer>
            <boardSt.PanelHead>Market</boardSt.PanelHead>
            <MarketPanel>
                {isLoading || error ? (<boardSt.LoadingMsg><p>{message}</p></boardSt.LoadingMsg>) : (
                    // <CoinPriceData data={priceDataArray} />
                    <CoinPriceData data={coins} />
                )}
            </MarketPanel>
        </MarketContainer>
    );
};

const MarketContainer = styled(boardSt.Container)`
    height: 100%;
`;
const MarketPanel = styled(boardSt.Panel)`
    
    height: calc(100% - 40rem);
`;
