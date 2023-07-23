import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";

function Price() {
    const { usdPrice }  = useOutletContext<IUsdPrice>();
    return<>
        <PriceContainer>
            <UsdPrice><span>Current Price:</span><br />{usdPrice.price} USD</UsdPrice>
            <UsdList>
                <UsdListItem>1hour: <b>{usdPrice.percent_change_1h}</b></UsdListItem>
                <UsdListItem>6hour: <b>{usdPrice.percent_change_6h}</b></UsdListItem>
                <UsdListItem>12hour: <b>{usdPrice.percent_change_12h}</b></UsdListItem>
                <UsdListItem>24hour: <b>{usdPrice.percent_change_24h}</b></UsdListItem>
                <UsdListItem>7day: <b>{usdPrice.percent_change_7d}</b></UsdListItem>
                <UsdListItem>30day: <b>{usdPrice.percent_change_30d}</b></UsdListItem>
                <UsdListItem>1year: <b>{usdPrice.percent_change_1y}</b></UsdListItem>
                <UsdListItem>15month: <b>{usdPrice.percent_change_15m}</b></UsdListItem>
                <UsdListItem>30month: <b>{usdPrice.percent_change_30m}</b></UsdListItem>
            </UsdList>
        </PriceContainer>
    </>
}
const PriceContainer = styled.div`
    margin: 50px auto 50px;
    width: 80%;
`;
const UsdPrice = styled.h4`
    margin-left: 15px;
    margin-bottom: 25px;
    font-size: 18px;
    line-height: 1.3;
    span {
        font-size: 14px;
        font-weight: 400;
    }
`;
const UsdList = styled.ul``;
const UsdListItem = styled.li`
    margin-top: 10px;
    padding: 15px 20px;
    font-size: 14px;
    background-color: ${props => props.theme.contentsBg};
    border-radius: 12px;

    b {
        font-size: 16px;
        background-color: transparent;
    }
`;

interface IUsdPrice {
    usdPrice: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
    }
}

export default Price;