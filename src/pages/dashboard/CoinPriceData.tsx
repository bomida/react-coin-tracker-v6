import { ReactComponent as IconIncrease } from "../../assets/icon_increase.svg";
import { ReactComponent as IconDecrease } from "../../assets/icon_decrease.svg";
import { ReactComponent as FullWatch } from "../../assets/icon_watch_full.svg";
import { styled } from "styled-components";
import { useTable } from "react-table";
import React, { useMemo } from "react";
import { ICoins, IMG_URL, PriceInfo } from "../../apis";

// name 칼럼
const nameContainer = (id: string, name: string, shortName: string)=> {
    return (
        <CellSideFlex>
            <SymbolWrapper>
                <img src={`${IMG_URL}${id || 'X'}.png`} alt={`symbol_${name || 'X'}`} />
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
    return (
        <CellSideFlex>
            <input type="checkbox" id={name}/>
            <label htmlFor={name}>
                <FullWatch /> 
            </label>
        </CellSideFlex>
    );
}

// COLUMNS
const COLUMNS: any = [
    {
        Header: 'Name',
        accessor : 'id',
        Cell: ({ row }: { row: { original: PriceInfo } }) => nameContainer(row.original.id, row.original.name, row.original.symbol)
    },
    {
        Header: 'Price',
        accessor : 'quotes.USD.price',
        Cell: ({ value }: { value: number }) => `$${Number(value.toFixed(2)).toLocaleString()}`
    },
    {
        Header: 'Change',
        accessor : 'quotes.USD.percent_change_24h',
        Cell: ({ value }: { value: number }) => value >= 0 ? iconIncrease(value) : iconDecrease(value)
    },
    {
        Header: 'Market Cap',
        accessor : 'quotes.USD.market_cap',
        Cell: ({ value }: { value: number }) => `$${Number((value / 1000000).toFixed(2)).toLocaleString()}M`
    },
    {
        Header: 'Watch',
        accessor : 'name',
        Cell: ({ value }: { value: string }) => checkSubscribe(value),
    }
];

interface MarketProps {
    // data: PriceInfo[] | undefined;

    /* will delete */
    data: ICoins[] | undefined;
}

const CoinPriceData: React.FC<MarketProps> = ({data: priceDataArray}) => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => priceDataArray || [], [priceDataArray]);
    console.log(data.slice(0, 5).map(coin => console.log(coin.name)));
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data});

    return (
        <>
            {priceDataArray && (
                // <TableWrapper>
                //     <MarketTable {...getTableProps()}>
                //         <colgroup>
                //             <col width='35%' />
                //             <col width='15%' />
                //             <col width='20%' />
                //             <col width='20%' />
                //             <col width='10%' />
                //         </colgroup>
                //         <thead>
                //             {headerGroups.map(headerGroup => (
                //                 <tr {...headerGroup.getHeaderGroupProps()}>
                //                 {headerGroup.headers.map((column) => (
                //                     <th {...column.getHeaderProps()}>
                //                         {column.render('Header')}
                //                     </th>
                //                 ))}
                //             </tr>
                //             ))}
                //         </thead>
                //         <tbody {...getTableBodyProps()}>
                //             {rows.map((row) => {
                //                 prepareRow(row);
                //                 return (
                //                     <tr {...row.getRowProps()}>
                //                     {row.cells.map((cell) => (
                //                         <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                //                     ))}
                //                     </tr>
                //                 );
                //             })}
                //         </tbody>
                //     </MarketTable>
                // </TableWrapper>


                /* will delete */
                data.slice(0, 5).map(coin => (
                    <CellSideFlex key={coin.id}>
                        <input type="checkbox" id={coin.name} onClick={() => handleClick(coin.id)}/>
                        <label htmlFor={coin.name}>
                            <MarketName>{coin.name}</MarketName>
                            <FullWatch /> 
                        </label>
                    </CellSideFlex>
                ))
            )}
        </>
    );
}

const handleClick = (id: string) => {
    console.log(id)
}


const TableWrapper = styled.div`
    overflow-y: scroll;
    max-height: 452rem;
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

    
    /* will delete */
    label {
        display: flex;
        align-items: center;
        margin-bottom: 15rem;
        cursor: pointer;
    }
    input {
        display: none;
    }
    svg {
        margin-left: 10rem;
        width: 15rem;
        height: auto;
        fill: transparent;
        stroke: ${props => props.theme.colors.ddd};
        transition: .1s ease-in-out;
    }
    input:checked + label svg {
        fill: ${props => props.theme.colors.primary};
        stroke: ${props => props.theme.colors.primary};
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

export default CoinPriceData;