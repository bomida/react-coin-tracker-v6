import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as boardSt from './Tradingboard.style';
import { styled } from 'styled-components';
import { ReactComponent as SelectArrow } from "../../assets/btn_select_arrow.svg";
import { useRecoilValue, useRecoilState } from 'recoil';
import { IPortfolioItem, IUserInfo, isCoinPriceAtom, isLoginAtom, isPriceAtom, isQuantityAtom, loggedInUserAtom } from '../../atoms';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { userInfoApi } from '../../apis';


const RightPanelTrade = () => {
    const { coinId } = useParams<{coinId?: string}>();
    const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserAtom);
    const isCoinPrice = useRecoilValue(isCoinPriceAtom);
    const isQuantityValue = useRecoilValue(isQuantityAtom);
    const isPriceValue = useRecoilValue(isPriceAtom);
    const [checkedStatus, setCheckedStatus] = useState(true);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [optionValue, setOptionValue] = useState<number>(1);
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const selectRef = useRef<HTMLDivElement>(null);
    const [isReset, setIsRest] = useState(false);

    const handleClickOpen = () => {
        setIsSelectOpen(prev => !prev);
    }

    const handleChangeOption = (e: ChangeEvent) => {
        setOptionValue(Number(e.target.attributes[4].value));
        setTimeout(() => {
            setIsSelectOpen(false);
        }, 50);
    }

    const handleDocumentClick = (e: MouseEvent) => {
        if (selectRef.current !== null && !selectRef.current.contains(e.target as HTMLElement)) {
            setIsSelectOpen(false);
        }
    }

    const clickExcuteTrade = async () => {
        let account = 0;
        let defaultPortfolioItem: IPortfolioItem = {
            coinId: undefined,
            quantity: 0,
            amount: 0,
            traded_amt: 0
        };

        // 1. 로그인 상태인지 체크
        if (isLogin !==  true) {
            setIsLogin(false);
            return;
        }

        if (!loggedInUser) {
            return;
        }
        // 현재 보유 중인 코인인지 확인
        let matchMyCoin = loggedInUser.portfolio.find(myCoin => myCoin.coinId === coinId) || defaultPortfolioItem;
        account = loggedInUser.account;

        // 2. 거래 종류 체크 (BUY)
        if (checkedStatus) {
        
            // BUY: 수량
            if (isQuantityValue && account >= defaultPortfolioItem.amount) {
                defaultPortfolioItem.quantity = matchMyCoin?.quantity + Number(isQuantityValue);
                defaultPortfolioItem.amount = matchMyCoin?.amount + isCoinPrice * parseFloat(isQuantityValue.replace(/,/g, ''));
                account = loggedInUser?.account - defaultPortfolioItem.amount;
            }
            // BUY: 금액
            else if (isPriceValue  && account >= defaultPortfolioItem.amount) {
                defaultPortfolioItem.quantity = matchMyCoin?.quantity + isCoinPrice / parseFloat(isPriceValue.replace(/,/g, ''));
                defaultPortfolioItem.amount = matchMyCoin?.amount + Number(isPriceValue);
                account = loggedInUser?.account - defaultPortfolioItem.amount;
            }
            else {
                window.alert('매수 실패: 보유 금액보다 매수 요청 금액이 더 큽니다.');
                return
            }
        }

        // 2. 거래 종류 체크 (SELL)
        if (!checkedStatus) {

            if (!matchMyCoin) {
                window.alert('매도 실패: 해당 코인을 보유하고 있지 않습니다.');
                return;
            }

            // 수량
            if (isQuantityValue && Number(isQuantityValue) <= matchMyCoin.quantity) {
                defaultPortfolioItem.quantity = matchMyCoin.quantity - Number(isQuantityValue);
                defaultPortfolioItem.amount = matchMyCoin.amount - (isCoinPrice * parseFloat(isQuantityValue.replace(/,/g, '')));
                account = loggedInUser?.account + defaultPortfolioItem.amount;
            }
            // 금액
            else if (isPriceValue && Number(isPriceValue) <= matchMyCoin.amount) {
                defaultPortfolioItem.quantity = matchMyCoin.quantity - (parseFloat(isPriceValue.replace(/,/g, '')) / isCoinPrice);
                defaultPortfolioItem.amount = Number(isPriceValue);
                account = loggedInUser?.account + defaultPortfolioItem.amount;
            }
            else {
                window.alert('매도 실패: 보유 금액보다 매도 요청 금액이 더 큽니다.');
            }
        }

        // 3. 추가할 코인 정보
        let tradeResult = {
            coinId: coinId,
            quantity: defaultPortfolioItem.quantity,
            amount: defaultPortfolioItem.amount,
            traded_amt: isCoinPrice
        };
        console.log('tradeResult', tradeResult);

        try {
            const userId = loggedInUser?.id; // 현재 사용자 id 가져오기
            const response = await userInfoApi.get(`/users/${userId}`); // 사용자 데이터 가져오기
            const userData = response.data;
            // portfolio에서 matchMyCoin과 같은 coinId를 가진 항목 찾기
            let dupIndex = userData.portfolio.findIndex((prevCoin: {coinId: string}) => prevCoin.coinId === tradeResult.coinId);

            if (dupIndex !== -1) {
                // 같은 coinId 값을 가진 요소가 있으면 해당 위치에 tradeResult를 넣는다.
                if(tradeResult.quantity === 0 || tradeResult.amount === 0) {
                    // 만약 tradeResult의 quantity나 amount가 0이라면 해당 객체를 삭제한다.
                    userData.portfolio.splice(dupIndex, 1);
                } else {
                    userData.portfolio[dupIndex] = tradeResult;
                }
            } else {
                // 같은 coinId 값을 가진 요소가 없으면, 배열에서 제거하고 새로운 tradeResult를 추가한다.
                // 단, quantity나 amount가 0인 경우는 추가하지 않는다.
                if(tradeResult.quantity !== 0 && tradeResult.amount !== 0) {
                    userData.portfolio.push(tradeResult);
                }
            }

            
            await userInfoApi.put(`/users/${userId}`, userData);
        } catch(error) {
            // console.log(error);
        }

        // 0. input reset
        setIsRest(true);
    }

    useEffect(() => {
        // select 박스가 아닌 곳을 클릭했을 때 닫기
        document.addEventListener('mousedown', handleDocumentClick);
        return() => {
            document.addEventListener('mousedown', handleDocumentClick);
        }
    }, [optionValue, isSelectOpen, checkedStatus]);


    return(
        <RightTradeContainer>
            <boardSt.RightPanelTitle>Make a Trade</boardSt.RightPanelTitle>
            <OrderTypeSelectContainer $checkedStatus={checkedStatus}>
                <OrderTypeInput type='radio' name='btn_trade' id='btn_buy' onChange={() => setCheckedStatus(true)} defaultChecked/>
                <OrderTypeLabel htmlFor='btn_buy'>buy</OrderTypeLabel>
                <OrderTypeInput type='radio' name='btn_trade' id='btn_sell' onChange={() => setCheckedStatus(false)}/>
                <OrderTypeLabel htmlFor='btn_sell'>sell</OrderTypeLabel>
            </OrderTypeSelectContainer>

            {/* 샐렉트 박스 */}
            <SelectBox ref={selectRef} $isSelectOpen={isSelectOpen} onClick={handleClickOpen}>
                <SelectArrow/>
                <SelectInput name='option' id='option1' value='1' onChange={handleChangeOption} defaultChecked></SelectInput>
                <SelectLabel htmlFor='option1'>Quantity</SelectLabel>
                <HorizontalLine></HorizontalLine>
                <SelectInput name='option' id='option2' value='2' onChange={handleChangeOption}></SelectInput>
                <SelectLabel htmlFor='option2'>Amount</SelectLabel>
            </SelectBox>

            {optionValue === 1 && <TypeQuantity isCoinPrice={isCoinPrice} isReset={isReset} />}
            {optionValue === 2 && <TypePrice isCoinPrice={isCoinPrice} isReset={isReset} />}

                {loggedInUser?.portfolio.map(assets => (
                    assets.coinId === coinId && 
                        <OwnedCoinInfo>
                            <p>Owned Coin Info</p>
                            <p>{assets.quantity} ea</p>
                            <p>$ {assets.amount}</p>
                        </OwnedCoinInfo>
                    )
                )}

            <BtnTransaction onClick={clickExcuteTrade}>{checkedStatus ? 'buy' : 'sell'}</BtnTransaction>
        </RightTradeContainer>
    );
}

interface TradeProps {
    isCoinPrice: number;
    isReset: boolean;
}

const TypeQuantity:React.FC<TradeProps> = ({isCoinPrice, isReset}) => {
    const [isQuantityValue, setIsQuantity] = useRecoilState(isQuantityAtom);
    const [isRadioChecked, setIsRadioChecked] = useState<number | null>(null);
    const resultPrice = isCoinPrice * parseFloat(isQuantityValue.replace(/,/g, ''));
    const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = parseFloat(e.target.value.replace(/,/g, ''));
        const formattedValue = isNaN(numericValue) ? '' : numericValue.toLocaleString();
        setIsQuantity(formattedValue);
    }

    const changeRadioQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsQuantity(e.target.value);
        setIsRadioChecked(Number(e.target.value));
    }

    useEffect(() => {
        if (isQuantityValue === '') setIsRadioChecked(null);

        if (isReset) setIsQuantity('');
    }, [isQuantityValue, isReset]);

    const quantitiesArr = [10, 50, 100, 500, 1000];

    return(
        <SelectedTypeContainer>
            <TypeComment>How many?</TypeComment>
            <InputWrapper>
                <input type='text' placeholder='Quantity' value={isQuantityValue} onChange={changeQuantity} />
                <span>ea</span>
            </InputWrapper>
            <SelectedRadioGroup>
                {quantitiesArr?.map((quantity, idx) => (
                    <label htmlFor={`quantity${idx + 1}`} key={`quantity${idx + 1}`}>
                    <input
                        type="radio"
                        id={`quantity${idx + 1}`}
                        name="radio_quantity"
                        value={quantity}
                        checked={isRadioChecked === quantity}
                        onChange={changeRadioQuantity}
                    />
                    {quantity}
                </label>
                ))}
            </SelectedRadioGroup>
            <TotalPriceWrapper>
                <span>Total Price</span>
                <p>$<b>{!resultPrice ? 0 : resultPrice}</b></p>
            </TotalPriceWrapper>
        </SelectedTypeContainer>
    );
}

const TypePrice:React.FC<TradeProps> = ({isCoinPrice, isReset}) => {
    const [isPriceValue, setIsPriceValue] = useRecoilState(isPriceAtom);
    const [isRadioChecked, setIsRadioChecked] = useState<number |  null>(null);
    const resultQuantity = isCoinPrice / parseFloat(isPriceValue.replace(/,/g, ''));

    const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = parseFloat(e.target.value.replace(/,/g, ''));
        const formattedValue = isNaN(numericValue) ? '' : numericValue.toLocaleString();

        setIsPriceValue(formattedValue);
    }

    const changeRadioPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPriceValue(e.target.value);
        setIsRadioChecked(Number(e.target.value));
    }

    useEffect(() => {
        if (isPriceValue === '') setIsRadioChecked(null);

        if (isReset) setIsPriceValue('');
    }, [isPriceValue, isReset]);

    const pricesArr = [50, 100, 500, 1000];

    return(
        <SelectedTypeContainer>
            <TypeComment>How much?</TypeComment>
            <InputWrapper>
                <span>$</span>
                <input type='text' placeholder='Price' value={isPriceValue} onChange={changePrice} />
                <span>usd</span>
            </InputWrapper>
            <SelectedRadioGroup>
                {pricesArr?.map((price, idx) => (
                    <label htmlFor={`Price${idx + 1}`} key={`Price${idx + 1}`}>
                    <input
                        type="radio"
                        id={`Price${idx + 1}`}
                        name="radio_price"
                        value={price}
                        checked={isRadioChecked === price}
                        onChange={changeRadioPrice}
                    />
                    ${price}
                </label>
                ))}
            </SelectedRadioGroup>
            <TotalPriceWrapper>
                <span>Total Quantity</span>
                <p><b>{!resultQuantity ? 0 : resultQuantity.toFixed(10)}</b></p>
            </TotalPriceWrapper>
        </SelectedTypeContainer>
    );
}


const OwnedCoinInfo = styled.div`
    color: ${props => props.theme.colors.txtBlack};
    font-size: ${props => props.theme.fontSize.rg};

    p:first-child {
        margin: 25rem 0 8rem;
        font-weight: 500;
    }
`;

const SelectBox = styled.div<{$isSelectOpen: boolean}>`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    height: ${props => props.$isSelectOpen ? '100rem' : '50rem'};
    margin-top: 50rem;
    padding: 9rem 0rem;
    border-radius: 10rem;
    border: 1px solid${props => props.$isSelectOpen ? props.theme.colors.txtBlack : props.theme.colors.primaryTxt};
    transition: border-color .2s ease-in-out;
    cursor: pointer;

    &:hover {
        border-color: ${props => props.theme.colors.txtBlack};
    }
    
    svg {
        position: absolute;
        top: 22rem;
        right: 15rem;
        z-index: 50;
        stroke: ${props => props.theme.colors.txtBlack};
        transform: ${props => props.$isSelectOpen ? 'rotate(180deg)' : 'rotate(0deg)'} ;
        transition: transform .2s ease-in-out;
    }
`;
const HorizontalLine = styled.div`
    position: absolute;
    top: 50rem;
    left: 15rem;
    width: calc(100% - 30rem);
    height: 1rem;
    background-color: ${props => props.theme.colors.nine};
`;
const SelectLabel = styled.label`
    padding: 9rem 15rem;
    color: ${props => props.theme.colors.primaryTxt};
    font-size: ${props => props.theme.fontSize.rg};
    font-weight: 500;
    transition: color .2s ease-in-out;
    cursor: pointer;
    
    &:hover {
        color: ${props => props.theme.colors.txtBlack};
    }
`;
const SelectInput = styled.input.attrs({type: 'radio'})`
    display: none;

    &:first-child + ${SelectLabel} {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${props => props.theme.colors.primaryTxt};
    }

    &:checked + ${SelectLabel} {
        order: 1;
        margin-bottom: 9rem;
        color: ${props => props.theme.colors.txtBlack};
        pointer-events: none;
    }
    &:not(:checked) + ${SelectLabel} {
        order: 2;
        margin-top: 9rem;
    }
`;

const RightTradeContainer = styled(boardSt.Container)`
    position: relative;
    height: 100%;
`;

const OrderTypeSelectContainer = styled.div<{$checkedStatus: boolean}>`
    display: flex;
    justify-content: ${props => props.$checkedStatus ? 'flex-start' : 'flex-end'};
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
const OrderTypeLabel = styled.label`
    position: relative;
    z-index: 1;
    padding-top: 15rem;
    padding-bottom: 16rem;
    width: 100%;
    height: 45rem;
    color: ${props => props.theme.colors.primaryTxt};
    font-size: ${props => props.theme.fontSize.rg};
    text-transform: uppercase;
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
const OrderTypeInput = styled.input.attrs({ type: 'radio'})`
    display: none;

    &:checked + ${OrderTypeLabel} {
        color: ${props => props.theme.colors.white};
    }
`;

const SelectedTypeContainer = styled.div`
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
    padding: 15rem 15rem 16rem;
    width: 100%;
    color: ${props => props.theme.colors.three};
    font-size: ${props => props.theme.fontSize.rg};
    font-weight: 500;
    text-transform: uppercase;
    border: 1px solid ${props => props.theme.colors.nine};
    border-radius: 10rem;
    transition: border-color .2s ease-in-out;

    &:has(input:focus) {
        border-color: ${props => props.theme.colors.txtBlack};
    }
    
    input {
        width: 100%;
        background-color: transparent;
    }

    input + span {
        font-size: ${props => props.theme.fontSize.sm};
    }
`;
const SelectedRadioGroup = styled.div`
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
        min-width: fit-content;
        color: ${props => props.theme.colors.txtBlack};
    }
    
    p {
        overflow: hidden;
        color: ${props => props.theme.colors.red};
        text-overflow: ellipsis;
    }
`;

const BtnTransaction = styled.div`
    position: absolute;
    bottom: 0;
    padding: 13rem 0;
    width: 100%;
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSize.rg};
    text-align: center;
    text-transform: uppercase;
    background-color: ${props => props.theme.colors.txtBlack};
    border-radius: 20rem;
    cursor: pointer;
`;

export default RightPanelTrade;