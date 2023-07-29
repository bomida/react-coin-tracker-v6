import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style"
import { useTable } from "react-table";
import { useMemo } from "react";

interface IHeaderMarketCoins {
    readonly Header: string;
    readonly accessor: string;
}
const COLUMNS: IHeaderMarketCoins | any = [
    {
        Header: 'Name',
        accessor : 'coinName'
    },
    {
        Header: 'Price',
        accessor : 'price'
    },
    {
        Header: 'Change',
        accessor : 'change'
    },
    {
        Header: 'Market Cap',
        accessor : 'market_cap'
    },
    {
        Header: 'Watch',
        accessor : 'watch',
        Cell: ({ value }: { value: boolean }) => (value ? '진실' : '거짓'),
    }
];

interface IBodyMarketCoins {
    coinName: string;
    coinNameShort: string;
    coinMount: string;
    yesterRate: number;
    currentRate: number;
    market_cap: number;
    profitMount: string;
    watch: boolean;
}
const DATA: IBodyMarketCoins[] = [
    {
        coinName: 'Aave',
        coinNameShort: 'AAV',
        coinMount: '1.55',
        yesterRate: 5.3,
        currentRate: 1.3,
        market_cap: 1949578440,
        profitMount: '7.235',
        watch: false,
    },
    {
        coinName: 'Eheriuem',
        coinNameShort: 'ETR',
        coinMount: '1.55',
        yesterRate: 5.3,
        currentRate: 1.3,
        market_cap: 1295910295,
        profitMount: '600000',
        watch: true,
    },
    {
        coinName: 'WAVES',
        coinNameShort: 'WAVES',
        coinMount: '115.555',
        yesterRate: 5.3,
        currentRate: 10.25,
        market_cap: 5076953012,
        profitMount: '600000',
        watch: false,
    },
    {
        coinName: 'VChain',
        coinNameShort: 'VET',
        coinMount: '1.2',
        yesterRate: 25.3,
        currentRate: 10.25,
        market_cap: 3962230468,
        profitMount: '24000',
        watch: false,
    },
    {
        coinName: 'SHINEE',
        coinNameShort: 'SIN',
        coinMount: '36.55',
        yesterRate: 1.3,
        currentRate: 1.326,
        market_cap: 1295910295,
        profitMount: '600000',
        watch: true,
    },
    {
        coinName: 'WAVES',
        coinNameShort: 'WAVES',
        coinMount: '115.555',
        yesterRate: 45.3,
        currentRate: 10.25,
        market_cap: 8472838456,
        profitMount: '600000',
        watch: false,
    },
];

function Market() {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => DATA, [])

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
                <MarketTable {...getTableProps()}>
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
            </boardSt.Panel>
        </MarketContainer>
    );
}

const MarketContainer = styled(boardSt.Container)`
    grid-column: 2 / 4;
    grid-row: 3 / 7;
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
`;

export default Market;