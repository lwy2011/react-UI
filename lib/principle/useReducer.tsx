import React, {
    useReducer
} from "react";
import Button from "../button/button";

() => {
};
const initialState = {n: 0};
const reducer = (state: { n: number }, action: { type: string, num: number }) => {
    const {type, num} = action;
    if (type === "+") {
        return {n: state.n + num};
    } else if (type === "*") {
        return {n: state.n * num};
    } else {
        throw new Error("unknown action");
    }
};


const UseReducer = () => {
    const lists = [
        "创建初始值initialState",
        "创建操作reducer(state,action)",
        "传给useReducer，得到读写api",
        "调用写type操作类型"
    ];
    const [state, dispatch] = useReducer(reducer, initialState);
    const add = () => {
        dispatch({type: "+", num: 1});
    };
    const multiply = () => {
        dispatch({type: "*", num: 2});
    };

    return (
        <div className={"yr-useState"}>
            <ul>
                {
                    lists.map(
                        (val, ind) => <li key={val}>
                            {ind + 1}、{val}
                        </li>
                    )
                }
            </ul>
            <div style={{margin: "1em auto"}}>
                <p>
                    n={state.n}
                </p>
                <Button message={"+1"} onClick={add}/>
                <Button message={"*2"} onClick={multiply}/>
            </div>
        </div>
    );
};
export default UseReducer;