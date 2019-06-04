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
    //IE的用的是算出滚动条的真实宽度，得益于IE的滚动条是实在的可计算的。
    //Webkit的，因为css暂时！！记住暂时是可以用css设置滚动条的,所以直接设置为none了。这是我的权衡，这玩意是js暂时算不出的
    //因为没有想到一个万能的方法，算出来
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