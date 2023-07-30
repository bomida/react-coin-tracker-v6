import { styled } from "styled-components";
import * as boardSt from "./Coninboard.style"

interface IMyCoins {
    id: number;
    coinName: string;
    coinNameShort: string;
    coinAmount: string;
    profitRate: string;
    profitAmount: string;
}

const data: IMyCoins[] = [
    {   
        id: 1,
        coinName: 'Eheriuem',
        coinNameShort: 'ETR',
        coinAmount: '1.55',
        profitRate: '- 21.3',
        profitAmount: '600000',
    },
    {   
        id: 2,
        coinName: 'WAVES',
        coinNameShort: 'WAVES',
        coinAmount: '115.555',
        profitRate: '+ 10.25',
        profitAmount: '1360',
    },
    {   
        id: 3,
        coinName: 'VChain',
        coinNameShort: 'VET',
        coinAmount: '1.2',
        profitRate: '- 4.853',
        profitAmount: '24000',
    }
];

function Profile() {
    return (
        <ProfileContainer>
            <boardSt.PanelHead>Profile</boardSt.PanelHead>
            <boardSt.Panel>
                <boardSt.sectionTitle>My Assets</boardSt.sectionTitle>
                <AssetsLists>
                    {data?.map(myCoin => (
                            <AssetsItem key={myCoin.id}>
                                <InfoWrapper>
                                    <MyCoinName>{myCoin.coinName}<span>{myCoin.coinNameShort}</span></MyCoinName>
                                    <MyCoinAmount>{myCoin.coinAmount}<span>{myCoin.coinNameShort}</span></MyCoinAmount>
                                </InfoWrapper>
                                <InfoWrapper>
                                    <ProfitRate>{myCoin.profitRate}%</ProfitRate>
                                    <ProfitAmount>${Number(myCoin.profitAmount).toLocaleString()}</ProfitAmount>
                                </InfoWrapper>
                            </AssetsItem>
                        ))}
                </AssetsLists>

                <boardSt.sectionTitle>Balance</boardSt.sectionTitle>
                <DonutChart>
                    <span>Profit</span>
                    <p>$234,734</p>
                </DonutChart>
            </boardSt.Panel>
        </ProfileContainer>
    );
}

const ProfileContainer = styled(boardSt.Container)`
    grid-column: 1 / 2;
    grid-row: 1 / 7;
`;

const AssetsLists = styled.ul`
    margin: 15rem 0 35rem;
`;
const AssetsItem = styled.li`
    display: flex;
    flex-direction: column;
    gap: 6rem;
    padding: 15rem;
    border-radius: 15rem;
    transition: all .3s ease-in-out;
`;
const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;
const MyCoinName = styled.h5`
    font-size: ${props => props.theme.fontSize.md};
    font-weight: 600;

    span {
        margin-left: 4rem;
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.sm};
        font-weight: 400;
    }
`;
const MyCoinAmount = styled.p`
    font-size: ${props => props.theme.fontSize.md};
    font-weight: 500;

    span {
        margin-left: 4rem;
    }
`;
const ProfitRate = styled.p`
    color: ${props => props.theme.colors.green};
    font-size: ${props => props.theme.fontSize.sm};
`;
const ProfitAmount = styled.p`
    color: ${props => props.theme.colors.nine};
    font-size: ${props => props.theme.fontSize.sm};
    font-weight: 400;
`;

const DonutChart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    margin: 35rem auto 0;
    width: 200rem;
    height: 200rem;
    border: 7px solid ${props => props.theme.colors.primary};
    border-radius: 50%;

    span {
        color: ${props => props.theme.colors.nine};
        font-size: ${props => props.theme.fontSize.sm};
    }

    p {
        font-size: ${props => props.theme.fontSize.xl};
        font-weight: 600;
    }
`;

export default Profile;