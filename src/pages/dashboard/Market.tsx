import { ReactComponent as IconIncrease } from "../../assets/icon_increase.svg";
import { ReactComponent as IconDecrease } from "../../assets/icon_decrease.svg";
import { ReactComponent as EmptyWatch } from "../../assets/icon_watch_empty.svg";
import { ReactComponent as FullWatch } from "../../assets/icon_watch_full.svg";
import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style"
import { useTable, CellProps } from "react-table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { ICoins, PriceInfo, fetchCoins, fetchPriceData } from "../../apis";

// name 칼럼
interface NameProps {
    id: string;
    coinName: string;
    coinNameShort: string;
}
const nameContainer = (id: string, name: string, shortName: string)=> {
    return (
        <CellSideFlex>
            <SymbolWrapper>
                <img src={`https://cryptocurrencyliveprices.com/img/${id || 'X'}.png`} alt={`symbol_${name || 'X'}`} />
            </SymbolWrapper>
            <MarketName>{name}<br/><span>{shortName}</span></MarketName>
        </CellSideFlex>
    );
}
// change 칼럼
const iconIncrease = (value: number) => {
    return (
        <CellSideFlex>
            <IconIncrease />
            <span>{`+${value.toFixed(2)}%`}</span>
        </CellSideFlex>
    );
};
const iconDecrease = (value: number) => {
    return (
        <CellSideFlex>
            <IconDecrease />
            <span>{`${value.toFixed(2)}%`}</span>
        </CellSideFlex>
    );
};
const checkSubscribe = (name: string) => {
    // const handleCheckWatch
    return (
        <CellSideFlex>
            <input type="checkbox" id={name}/>
            <label htmlFor={name}>
                <FullWatch /> 
            </label>
        </CellSideFlex>
    );
}
// header
const COLUMNS: any = [
    {
        Header: 'Name',
        accessor : (row: PriceInfo): NameProps => {
            return { id: row.id ,coinName: row.name, coinNameShort: row.symbol }
        },
        Cell: ({ value }: CellProps<PriceInfo, NameProps>) => nameContainer(value.id, value.coinName, value.coinNameShort)
    },
    {
        Header: 'Price',
        accessor : (row: PriceInfo) => `$${Number(row.quotes.USD.price.toFixed(2)).toLocaleString()}`
    },
    {
        Header: 'Change',
        accessor : (row: PriceInfo) => {
            let rate = row.quotes.USD.percent_change_24h
            return rate >= 0 ? iconIncrease(rate) : iconDecrease(rate)
        }
    },
    {
        Header: 'Market Cap',
        accessor : (row: PriceInfo) => `$${Number((row.quotes.USD.market_cap / 1000000).toFixed(2)).toLocaleString()}M`
    },
    {
        Header: 'Watch',
        accessor : (row: PriceInfo) => row.name,
        Cell: ({ value }: { value: string }) => checkSubscribe(value),
    }
];

function Market() {
    const [marketIds, setMarketIds] = useState<string[]>([]); 
    const { isLoading: marketDataLoading, data: marketData } = useQuery<ICoins[]>("marketCoins", fetchCoins);

    useEffect(() => {
        if (!marketDataLoading && marketData) {
            const ids: string[] = marketData?.slice(0, 4).map((coin) => coin.id);
            if (ids.length > 0) setMarketIds(ids);
        }
    }, []);

    const fetchAllPriceData = async (marketIds: string[]) => {
        const requests = marketIds.map(id => fetchPriceData(id));
        const response = await Promise.all(requests);
        return response;
    };
    const {isLoading:marketPriceDataLoading, data: marketPriceData} = useQuery<PriceInfo[]>('marketPriceCoins', () => fetchAllPriceData(marketIds));

    let marketLoading = marketDataLoading || marketPriceDataLoading;

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => marketPriceData || [], []);

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data});

    return (
        <MarketContainer>
            <boardSt.PanelHead>Market</boardSt.PanelHead>
            <boardSt.Panel>
                {marketLoading ? (<p>LOADING.....</p>) : (
                    <MarketTable {...getTableProps()}>
                        <colgroup>
                            <col width='35%' />
                            <col width='15%' />
                            <col width='20%' />
                            <col width='20%' />
                            <col width='10%' />
                        </colgroup>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </MarketTable>
                )}
            </boardSt.Panel>
        </MarketContainer>
    );
}

const MarketContainer = styled(boardSt.Container)`
    grid-column: 2 / 4;
`;

const SymbolWrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 10rem;
    width: 40rem;
    height: 40rem;
    border-radius: 10rem;
    background-color: #ffffff30;

    img {
        max-width: 22rem;
    }
`;
const MarketName = styled.p`
    font-size: ${props => props.theme.fontSize.md};
    line-height: 1.1;
    
    span {
        margin-left: unset;
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.sm};
    }
`;
const CellSideFlex = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-right: 7rem;
    }
`;
const MarketTable = styled.table`
    width: 100%;

    thead th {
        padding-bottom: 15rem;
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.sm};
        font-weight: 400;
        text-align: left;
        border-bottom: 1px solid ${props => props.theme.colors.three};
    }
    thead th:last-child {
        text-align: center;
    }
    
    tbody td {
        padding: 5rem 0;
        color: ${props => props.theme.colors.ddd};
        font-size: ${props => props.theme.fontSize.md};
        vertical-align: middle;
    }
    tbody tr:first-child td {
        padding-top: 10rem;
    }
    tbody td:last-child input {
        display: none;
    }
    tbody td:last-child label {
        margin: 0 auto;
        cursor: pointer;

        svg {
            fill: transparent;
            stroke: ${props => props.theme.colors.ddd};
            transition: .1s ease-in-out;
        }
    }
    tbody td:last-child input:checked + label svg {
        fill: ${props => props.theme.colors.primary};
        stroke: ${props => props.theme.colors.primary};
    }
`;

export default Market;