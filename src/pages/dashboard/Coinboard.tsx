import * as boardSt from "./Coninboard.style"
import Subscribe from "./Subscribe";
import Market from "./Market";
import Overoll from "./Overoll";

function Coinboard() {
    return (
        <boardSt.Wrap>
            <Overoll />
            <Subscribe />
            <Market />
        </boardSt.Wrap>
    );
}

export default Coinboard;
