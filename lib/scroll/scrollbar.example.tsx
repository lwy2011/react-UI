import ScrollBar from "./scrollbar";
import * as React from "react";
import "./scollbar.example.scss";
import {useState} from "react";

const ScrollBarExample: React.FunctionComponent = () => {
    const [count, setCount] = useState(10);
    const lists = Array.apply(null, {length: count}).map(
        (val: undefined, index: number) => index
    ).map((num: number) => <div className="yr-scroll-bar-example-list" key={num + 1}>{num}</div>);
    console.log(setCount, count);
    return (

        <ScrollBar style={{
            width: "80%",
            height: "10em",
            margin: "2em auto",
            background: "#fff4c2",
        }}>
            <div className="yr-scroll-bar-example">
                {lists}
            </div>
        </ScrollBar>
    );
};
export default ScrollBarExample;