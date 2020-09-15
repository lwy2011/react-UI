import React, {useEffect, useState} from "react";
import useN, {useM} from "./myHook.demo1";
import CodeView from "../../helpers/code_view";

() => {
};


const MyHooks = () => {
    const {n, setN} = useN();
    const {state, dispatch} = useM();
    const [key, setKey] = useState("");
    const [val, setVal] = useState("");

    useEffect(
        () => {
            console.log("n变了，可以被监听！");
        }, [n]
    );
    return (
        <div className={"yr-useState"}>
            <p>
                自定义hooks，其实本质上更像是reducer!一种更加独立性质的useState!只专注于数据本身！
            </p>
            <p>
                n={n},click-->
                <button onClick={() => {
                    setN(i => i + 1);
                }}>
                    n++
                </button>
            </p>
            <p>
                打开控制台，点击，可以看到外部的useState的变种，是可以被其他独立组件监听，达到响应式的！
            </p>
            <p>
                自定义hooks，其实真的就是reducer了！
            </p>
            <p>
                {JSON.stringify(state)}
            </p>
            <button onClick={() => {
                dispatch({add: 2});
            }}>
                m+2
            </button>
            <button onClick={() => {
                dispatch({multiply: 4});
            }}>
                m*4
            </button>
            <div>
                <p>
                    新增字段属性名：
                    <input type="text" value={key}
                           onChange={e => setKey(e.target.value)}/>
                </p>
                <p>
                    新增字段属性值：
                    <input type="text"
                           onChange={e => setVal(e.target.value)} value={val}/>
                </p>
                <button onClick={() => {
                    dispatch({[key]: val});
                }}>
                    ok
                </button>
                <p>
                    用它更灵活，用reducer更加格式化！反正都推荐，都是对数据逻辑与视图的分离的追求！
                    也是劝退redux的号召！
                </p>
                <p>
                    hooks的代码：
                </p>
                <CodeView path={"principle/myHook.demo1.tsx"}>
                </CodeView>
            </div>
        </div>
    );
};
export default MyHooks;