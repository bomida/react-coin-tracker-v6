import { useState } from 'react';
import * as boardSt from './Tradingboard.style';
import { styled } from 'styled-components';

function RightPanelTrade() {
    const [checkedStatus, setCheckedStatus] = useState(true);

    return(
        <boardSt.Container>
            <boardSt.RightPanelTitle>Make a Trade</boardSt.RightPanelTitle>
            <TradeRadioContainer checkedStatus={checkedStatus}>
                <TradeInput type='radio' name='btn_trade' id='btn_buy' onChange={() => setCheckedStatus(true)} defaultChecked/>
                <TradeLabel htmlFor='btn_buy'>
                    buy
                </TradeLabel>
                <TradeInput type='radio' name='btn_trade' id='btn_sell' onChange={() => setCheckedStatus(false)}/>
                <TradeLabel htmlFor='btn_sell'>
                    sell
                </TradeLabel>
            </TradeRadioContainer>

            {/* 금액 */}
            <OrderTypeContainer>
                <TypeComment>How much?</TypeComment>
                <InputWrapper>
                    <span>$</span>
                    <input type='number' placeholder='Price' />
                    <span>usd</span>
                </InputWrapper>
                <OrderTypeRadioContainer>
                    <label htmlFor="Price1">
                        <input type="radio" id="Price1" name="radio_price" defaultChecked />
                        $50
                    </label>
                    <label htmlFor="Price2">
                        <input type="radio" id="Price2" name="radio_price" />
                        $100
                    </label>
                    <label htmlFor="Price3">
                        <input type="radio" id="Price3" name="radio_price" />
                        $500
                    </label>
                    <label htmlFor="Price4">
                        <input type="radio" id="Price4" name="radio_price" />
                        $1000
                    </label>
                </OrderTypeRadioContainer>
                <TotalPriceWrapper>
                    <span>Total Price</span>
                    <p>$<b>140</b></p>
                </TotalPriceWrapper>
            </OrderTypeContainer>

            {/* 수량 */}
            <OrderTypeContainer>
                <TypeComment>How much?</TypeComment>
                <InputWrapper>
                    <span>$</span>
                    <input type='number' placeholder='Price' />
                    <span>usd</span>
                </InputWrapper>
                <OrderTypeRadioContainer>
                    <label htmlFor="Price1">
                        <input type="radio" id="Price1" name="radio_price" defaultChecked />
                        $50
                    </label>
                    <label htmlFor="Price2">
                        <input type="radio" id="Price2" name="radio_price" />
                        $100
                    </label>
                    <label htmlFor="Price3">
                        <input type="radio" id="Price3" name="radio_price" />
                        $500
                    </label>
                    <label htmlFor="Price4">
                        <input type="radio" id="Price4" name="radio_price" />
                        $1000
                    </label>
                </OrderTypeRadioContainer>
                <TotalPriceWrapper>
                    <span>Total Price</span>
                    <p>$<b>140</b></p>
                </TotalPriceWrapper>
            </OrderTypeContainer>

            <BtnTransaction>buy</BtnTransaction>
        </boardSt.Container>
    );
}

const BtnTransaction = styled.div`
    padding: 13rem 0;
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.rg};
    text-align: center;
    text-transform: uppercase;
    background-color: ${props => props.theme.colors.txtBlack};
    border-radius: 20rem;
`;
const OrderTypeContainer = styled.div`
    margin-top: 30rem;
`;
const TypeComment = styled.div`
    color: ${props => props.theme.colors.txtBlack};
    font-size: ${props => props.theme.fontSize.sm};
`;
const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5rem;
    margin: 10rem 0;
    padding: 18rem 15rem;
    width: 100%;
    color: ${props => props.theme.colors.three};
    font-size: ${props => props.theme.fontSize.rg};
    font-weight: 500;
    text-transform: uppercase;
    border: 1px solid ${props => props.theme.colors.nine};
    border-radius: 10rem;

    input {
        width: 100%;
        background-color: transparent;
    }

    span:last-child {
        font-size: ${props => props.theme.fontSize.sm};
    }
`;
const OrderTypeRadioContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 11rem;
    width: 100%;

    input {
        display: none;
    }
    
    label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 20rem;
        color: ${props => props.theme.colors.txtBlack};
        font-size: ${props => props.theme.fontSize.sm};
        font-weight: 500;
        border: 1px solid ${props => props.theme.colors.txtBlack};
        border-radius: 20rem;
        transition: all .2s ease-in-out;
        cursor: pointer;
    }

    label:has(input:checked) {
        color: ${props => props.theme.colors.white};
        background-color: ${props => props.theme.colors.txtBlack};
    }
`;
const TotalPriceWrapper = styled.div`
    display: flex;
    gap: 8rem;
    margin: 30rem auto 0;
    width: fit-content;
    font-size: ${props => props.theme.fontSize.rg};
    font-weight: 500;

    span {
        color: ${props => props.theme.colors.txtBlack};
    }
    p {
        color: ${props => props.theme.colors.red};
    }
`;

const TradeRadioContainer = styled.div<{checkedStatus: boolean}>`
    display: flex;
    justify-content: ${props => props.checkedStatus ? 'flex-start' : 'flex-end'};
    position: relative;
    overflow: hidden;
    margin-top: 30rem;
    height: 45rem;
    border: 1px solid ${props => props.theme.colors.txtBlack};
    border-radius: 25rem;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        z-index: 0;
        width: 142rem;
        height: 100%;
        background-color: ${props => props.theme.colors.txtBlack};
        border-radius: 25rem;
    }
`;
const TradeLabel = styled.label`
    position: relative;
    z-index: 1;
    padding-top: 15rem;
    padding-bottom: 16rem;
    width: 100%;
    height: 45rem;
    color: ${props => props.theme.colors.primaryTxt};
    font-size: ${props => props.theme.fontSize.rg};
    text-transform: uppercase;
    transition: color .2s ease-in-out;
    cursor: pointer;
    border: 0px solid red;

    &:nth-child(2) {
        padding-left: 56rem;
    }
    &:nth-child(4) {
        padding-right: 53rem;
        text-align: right;
    }
`;
const TradeInput = styled.input.attrs({ type: 'radio'})`
    display: none;

    &:checked + ${TradeLabel} {
        color: ${props => props.theme.colors.white};
    }
`;

export default RightPanelTrade;