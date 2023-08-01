import React, { useState } from 'react';
import * as boardSt from "./Coninboard.style"
import CoinPriceData from "./CoinPriceData";
import { useQuery } from 'react-query';
import { ICoins, PriceInfo, fetchCoins, fetchPriceData } from '../../apis';
import { styled } from 'styled-components';


export const Market = () => {
    const { isLoading, data: coins, error } = useQuery<ICoins[]>('coins', fetchCoins);

    const selectedCoinIds = coins?.slice(0, 4).map((coin) => coin.id) || [];
    const { data: priceDataArray } = useQuery<PriceInfo[]>(['priceData'],
        async () => {
            return Promise.all(selectedCoinIds.map((coinId) => fetchPriceData(coinId)));
        }, {
            enabled: !!selectedCoinIds.length,
        }
    );

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMETHING HAS BEEN WRONG :(';

    return (
        <MarketContainer>
            <boardSt.PanelHead>Market</boardSt.PanelHead>
            <boardSt.Panel>
                {isLoading || error ? (<boardSt.LoadingMsg>{message}</boardSt.LoadingMsg>) : (
                    <CoinPriceData data={priceDataArray} />
                )}
            </boardSt.Panel>
        </MarketContainer>
    );
};

const MarketContainer = styled(boardSt.Container)`
    grid-column: 2 / 4;
`;
