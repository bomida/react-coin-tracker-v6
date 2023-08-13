import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style"
import { ReactComponent as More } from "../../assets/btn_more.svg";
import { useRecoilValue } from "recoil";
import { isSubscribeAtom } from "../../atoms";
import { useQuery } from "react-query";
import { IMG_URL, PriceInfo, fetchPriceData } from "../../apis";
import { useEffect, useState } from "react";


function Subscribe() {
    const isSubscribe = useRecoilValue(isSubscribeAtom);
    const [subscribedIds, setSubscribedIds] = useState<string[]>([]);

    useEffect(() => {
        setSubscribedIds(isSubscribe.slice(0, 4).map((coin) => coin));
    }, [isSubscribe]);

    const { isLoading, data: subscribeData, error } = useQuery<PriceInfo[]>(['subscribeData', subscribedIds],
        async () => {
            return Promise.all(subscribedIds.map((coinId) => fetchPriceData(coinId)));
        }, {
            enabled: !!subscribedIds.length,
            staleTime: 1000 * 60 * 10, // api block을 막기위해 캐시 만료 기간을 10분으로 설정 
        }
    );

    let message = '';
    if (isLoading) message = 'LOADING...';
    if (error) message = 'SOMETHING HAS BEEN WRONG :(';
    if (!isSubscribe.length || !subscribedIds.length) message = 'NO SUBSCIBE COINS :('

    return (
        <boardSt.Container>
            <boardSt.PanelHead>Subscribe</boardSt.PanelHead>
            <Lists>
                {(isLoading || !isSubscribe.length)
                    ? <SubscribeLoading><p>{message}</p></SubscribeLoading>
                    : subscribeData?.slice(0, 4).map(watchCoin => (
                        <boardSt.Panel key={watchCoin.id} as="li">
                            <WatchTop>
                                <WatchCoinName>{watchCoin.name}<br/><span>{watchCoin.symbol}</span></WatchCoinName>
                                <More />
                            </WatchTop>
                            <WatchCoinAmount>${Number(watchCoin.quotes.USD.price).toLocaleString()}</WatchCoinAmount>
                            <WatchBottom>
                                <WatchCoinSymbol>
                                    <img src={`${IMG_URL}${watchCoin.id || 'X'}.png`} alt={`symbol_${watchCoin.name || 'X'}`} />
                                </WatchCoinSymbol>
                                <WatchCoinRate $isFontColor={watchCoin.quotes.USD.percent_change_24h >= 0 ? true : false}>
                                    {watchCoin.quotes.USD.percent_change_24h >= 0 ? `+${watchCoin.quotes.USD.percent_change_24h}` : `${watchCoin.quotes.USD.percent_change_24h}`}%
                                </WatchCoinRate>
                            </WatchBottom>
                        </boardSt.Panel>
                    ))
                }
            </Lists>
        </boardSt.Container>
    );
}

const SubscribeLoading = styled(boardSt.LoadingMsg)`
    padding: 30rem;
    width: 100%;
    height: 223rem;
    background-color: ${props => props.theme.colors.panelBlack};
    border-radius: 15rem;
`;

const WatchTop = styled.div`
    display: flex;
    justify-content: space-between;
`;
const WatchCoinName = styled.h5`
    display: inline-block;
    font-size: ${props => props.theme.fontSize.md};
    font-weight: 600;
    line-height: 1.2;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.sm};
        font-weight: 400;
    }
`;

const WatchBottom = styled.div`
    display: flex;
    align-items: center;
`;
const WatchCoinAmount = styled.p`
    margin: 18rem 0 50rem;
    font-size: ${props => props.theme.fontSize.xl};
    font-weight: 500;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const WatchCoinSymbol = styled.span`
    display: inline-block;
    padding: 7rem;
    width: 35rem;
    height: 35rem;
    background-color: #ffffff30;
    border-radius: 10rem;

    img {
        width: 100%;
    }
`;
const WatchCoinRate = styled.p<{$isFontColor: boolean}>`
    margin-left: auto;
    color: ${props => props.$isFontColor ? props.theme.colors.green : props.theme.colors.red};
    font-size: ${props => props.theme.fontSize.md};
    font-weight: 500;
`;

const Lists = styled.ul`
    /* display: grid;
    grid-template-columns:  repeat(4, minmax(140rem, 183rem)); */
    display: flex;
    gap: 20rem;

    li {
        width: 100%;
        transition: .2s ease-in-out;

        &:hover {
            background-color: ${props => props.theme.colors.primary};
        }

        &:hover ${WatchCoinName},
        &:hover ${WatchCoinAmount} {
            color: ${props => props.theme.colors.txtBlack};
        }

        &:hover ${WatchCoinName} span {
            color: ${props => props.theme.colors.primaryTxt};
        }

        svg {
            margin-left: 10rem;
            padding-top: 3rem;
            fill: ${props => props.theme.colors.nine};
            cursor: pointer;
        }
        svg:hover {
            fill: ${props => props.theme.colors.primaryTxt};
        }
    }
`;
export default Subscribe;