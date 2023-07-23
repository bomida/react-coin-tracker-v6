import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../apis";
import { useSetRecoilState } from "recoil";
import { headerInfoAtom, IHeader } from "../atoms";

function Coins() {
    const {isLoading, data} = useQuery<ICoins[]>('allCoins', fetchCoins);
    const setHeaderInfo = useSetRecoilState(headerInfoAtom);
    const attachStateToLink = (headerInfo: IHeader) => setHeaderInfo(headerInfo);

    return(
        <>
            {isLoading ? (<p>loading...</p>) : (
                <CoinList>
                    {data?.slice(0, 50).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} onClick={() => attachStateToLink({id: coin.id, name: coin.name})}>
                                <CoinSymbol src={`https://cryptocurrencyliveprices.com/img/${coin?.id || 'xrp-xrp'}.png`} alt={`symbol_${coin?.name || 'xrp-xrp'}`} />
                                <CoinNameP>{coin?.name}</CoinNameP>
                                <LinkArrow>&rarr;</LinkArrow>
                            </Link>
                        </Coin>
                    ))}
                </CoinList>
            )}
        </>
    );
}

const CoinSymbol = styled.img`
    margin-right: 10px;
    width: 18px;
`;

const CoinNameP = styled.p`
    overflow: hidden;
    margin-right: 10px;
    width: 100%;
    color: ${props => props.theme.primary};
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
`;

const LinkArrow = styled.span`
    color: ${props => props.theme.primary};
`;

const Coin = styled.li`
    margin-bottom: 20px;
    font-weight: 500;
    background-color: ${props => props.theme.bgColor};
    border-radius: 10px;
    border: ${props => props.theme.border};
    cursor: pointer;

    &:hover {
        border-color: ${props => props.theme.primaryHover};
        a, ${CoinNameP}, ${LinkArrow} {
            color: ${props => props.theme.primaryHover};
        }
    }

    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
    }
`;

const CoinList = styled.ul`
    margin: 50px auto 0;
    width: 100%;
    max-width: 500px;
`;

interface ICoins {
    "id": string;
    "name": string;
    "symbol": string;
    "rank": number;
    "is_new": boolean;
    "is_active": boolean;
    "type": string;
}
export default Coins;