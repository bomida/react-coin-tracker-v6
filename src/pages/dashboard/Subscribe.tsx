import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style"
import { ReactComponent as More } from "../../assets/btn_more.svg";

interface IMyCoins {
    id: number;
    coinName: string;
    coinNameShort: string;
    coinMount: string;
    profitRate: string;
    profitMount: string;
}

const data: IMyCoins[] = [
    {
        id: 1,
        coinName: 'Aave',
        coinNameShort: 'AAV',
        coinMount: '1.55',
        profitRate: '+ 1.3',
        profitMount: '7.235',
    },
    {
        id: 2,
        coinName: 'Eheriuem',
        coinNameShort: 'ETR',
        coinMount: '1.55',
        profitRate: '- 21.3',
        profitMount: '600000',
    },
    {
        id: 3,
        coinName: 'WAVES',
        coinNameShort: 'WAVES',
        coinMount: '115.555',
        profitRate: '+ 10.25',
        profitMount: '1360',
    },
    {
        id: 4,
        coinName: 'VChain',
        coinNameShort: 'VET',
        coinMount: '1.2',
        profitRate: '- 4.853',
        profitMount: '24000',
    }
];

function Subscribe() {
    return (
        <SubscribeContainer>
            <boardSt.PanelHead>Subscribe</boardSt.PanelHead>
            <Lists>
                {data?.map(watchCoin => (
                    <boardSt.Panel key={watchCoin.id} as="li">
                        <WatchTop>
                            <WatchCoinName>{watchCoin.coinName}<br/><span>{watchCoin.coinNameShort}</span></WatchCoinName>
                            <More />
                        </WatchTop>
                        <WatchCoinAmount>${Number(watchCoin.profitMount).toLocaleString()}</WatchCoinAmount>
                        <WatchBottom>
                            <WatchCoinSymbol></WatchCoinSymbol>
                            <WatchCoinRate>- 2.35%</WatchCoinRate>
                        </WatchBottom>
                    </boardSt.Panel>
                ))}
            </Lists>
        </SubscribeContainer>
    );
}

const SubscribeContainer = styled(boardSt.Container)`
    grid-column: 2 / 4;
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
    width: 35rem;
    height: 35rem;
    background-color: #ffffff30;
    border-radius: 10rem;
`;
const WatchCoinRate = styled.p`
    margin-left: auto;
    color: ${props => props.theme.colors.green};
    font-size: ${props => props.theme.fontSize.md};
    font-weight: 500;
`;

const Lists = styled.ul`
    display: grid;
    grid-template-columns:  repeat(4, minmax(140rem, 183rem));
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