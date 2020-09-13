import React, {
    useState, useMemo
} from "react";

() => {
};


const Child = React.memo(
    (props: { n: number }) => {
        setTimeout(
            () => {
                alert("child 执行了！ react.memo,无父组件的函数通讯！");
            }
        );
        return <div>
            n = {props.n},react.memo,无父组件的函数通讯！
        </div>;
    }
);
const Child2 = (props: { n: number }) => {
    setTimeout(
        () => {
            alert("child2 执行了！");
        }
    );
    return <div>
        n = {props.n}
    </div>;
};
const Child3 = React.memo(
    (props: { n: number, setN: () => void }) => {
        setTimeout(
            () => {
                alert("child3 执行了！ react.memo 父组件的函数通讯！");
            }
        );
        return <div onClick={props.setN}>
            n = {props.n},react.memo 父组件的函数通讯！
        </div>;
    }
);
const Child4 = React.memo(
    (props: { n: number, setN: () => void }) => {
        setTimeout(
            () => {
                alert("child3 执行了！ react.memo 父组件的函数通讯！useMemo");
            }
        );
        return <div onClick={props.setN}>
            n = {props.n},react.memo 父组件的函数通讯！useMemo
        </div>;
    }
);

const UseMemo = () => {
    const [n, setN] = useState(1);
    const [m, setM] = useState(1);
    const addN = () => {
        setN(n + 1);
    };
    const addN1 = useMemo(
        () => () => setN(n + 1), [n]
    );
    return (
        <div className={"yr-useState"}>
            <p>
                react父组件要更新，它的子组件都要更新！这很浪费！所以memo出现了！
            </p>
            <h4>
                React.memo(component function)
            </h4>
            <button onClick={() => {
                setM(m + 1);
            }}>m++
            </button>
            <p>m = {m}</p>
            <Child2 n={n}/>
            <Child n={n}/>
            <Child3 n={n} setN={addN}/>
            <p>
                React.memo可以watch props上的属性，非函数属性不变，自身不变。
                但是接收父组件传的函数，是会更新的，它阻止不了！于是出现了useMemo!
            </p>
            <h4>
                {`useMemo(()=>()=>{},[xxx])`}
            </h4>
            <p>
                参数是两个，第一个是一个函数返回原本子组件依赖的那个函数，第二个是监听的state。
                它只是保留了上一次更新时的依赖函数，所以还是需要跟React.memo配合！
            </p>
            <Child4 setN={addN1} n={n}/>
            <h4>
                useCallback 是useMemo的语法糖！
            </h4>
            <code>
                useCallback(()=>{},[xxx]),看起来更舒服！
            </code>
        </div>
    );
};
export default UseMemo;