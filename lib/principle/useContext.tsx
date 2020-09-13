import React, {createContext, useContext, useState} from "react";

() => {
};

const Context = createContext({
    n: 1, setN: (n: number) => {
    }
});
const Child = () => {
    const {n, setN} = useContext(Context);
    return <div>
        n={n}
        <button onClick={() => {
            setN(n * 2);
        }}>*2
        </button>
    </div>;
};
const Parent = () => {
    const {n, setN} = useContext(Context);
    return <div>
        n={n}
        <button onClick={() => {
            setN(n + 2);
        }}>+2
        </button>
        <Child/>
    </div>;
};

const Grandparent = () => {
    const {n, setN} = useContext(Context);
    return <div>
        n={n}
        <button onClick={() => {
            setN(n + 10);
        }}>+10
        </button>
        <Parent/>
    </div>;
};
const UseContext = () => {
    const lists = [
        "创建上下文： C = createContext(initial)",
        "用<C.provider value={{state,setStateFn}}> 圈定作用域！",
        "作用域内使用useContext(C) 使用上下文！"
    ];
    const [n, setN] = useState(1);
    return (
        <div className={"yr-useState"}>
            <h4>
                useContext 上下文！
            </h4>
            <p>思路：</p>
            <ul>
                {
                    lists.map(
                        val => <li>{val}</li>
                    )
                }
            </ul>
            <div style={{margin: "1em auto"}}>
                <Context.Provider value={{n, setN}}>
                    <Grandparent/>
                </Context.Provider>
            </div>
            <p>
                react的组件的父子关系符合DOM的父子关系，而且是函数式组件，一旦要触发更新，
                其实就是生成一个新的函数，然后执行这个函数，这个函数包含的子组件函数都要执行！
            </p>
        </div>
    );
};
export default UseContext;