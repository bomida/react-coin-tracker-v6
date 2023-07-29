import * as boardSt from "./Coninboard.style"
import Profile from "./Profile";
import Subscribe from "./Subscribe";
import Market from "./Market";

function Coinboard() {
    return (
        <boardSt.Wrap>
            <Profile />
            <Subscribe />
            <Market />
        </boardSt.Wrap>
    );
}

export default Coinboard;
