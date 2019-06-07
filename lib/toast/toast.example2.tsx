import * as React from "react";
import Button from "../button/button";
import CodeView from "../../helpers/code_view";
import useInterval from "../interval/interval";
import {useState} from "react";


const IntervalExample: React.FunctionComponent =
    () => {
        const [time, setTime] = useState(0);
        return (
            <div className="yr-interval-example">
                <div style={{border: "1px solid red", margin: "2em 0"}}>
                    <h4>{"封装了一个定时器测试，不算toast的内容,作为helper"}</h4>
                    <Button message={"定时器测试"} onClick={() => setTime(10)}/>
                    <CodeView path={"interval/interval.tsx"}>
                    <span style={{color: "red", margin: "1em"}}>
                        {useInterval(() => setTime(time - 1), 1, time) + "s"}
                    </span>
                    </CodeView>
                </div>
            </div>
        );
    };

export default IntervalExample;