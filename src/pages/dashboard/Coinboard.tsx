import * as boardSt from "./Coninboard.style"
import Profile from "./Profile";
import Subscribe from "./Subscribe";
import { Market } from "./Market";

function Coinboard() {
    return (
        <boardSt.Wrap>
            <Profile />
            <boardSt.RightWrapper>
                <Subscribe />
                <Market />
            </boardSt.RightWrapper>
        </boardSt.Wrap>
    );
}

export default Coinboard;
