import React, {useEffect, useState} from "react";
import Button from "../button/button";

interface Obj {
    name: string,
    age?: number
}

// const objFn = {
//     callback: () => {
//     }
// };
const UseState = () => {
    const [obj, set] = useState<Obj>({name: "liu", age: 18});
    const [obj1, set1] = useState<Obj>({name: "liu", age: 18});
    const [obj2, set2] = useState<Obj>({name: "liu", age: 18});

    const Set1 = () => {
        obj1.name = "liuuu";
        set1(obj1);
    };
    const Set2 = () => {
        set2({...obj2, name: "liuu"});
    };
    const refresh = () => {
        set({name: "liu", age: 18});
        set1({name: "liu", age: 18});
        set2({name: "liu", age: 18});
    };
    const [obj3, set3] = useState(() => {
        alert("useState参数为函数时，此函数执行了！");
        return {n: 1};
    });
    const Set3 = () => {
        set3({n: obj3.n + 1});
    };
    const [m, setM] = useState(1);
    const [n, setN] = useState(1);
    const [n1, setN1] = useState(1);

    const addM = () => {
        setM(m + 1);
        setM(m + 2);
    };
    const addN1 = () => {
        setN1(i => i + 1);
        setN1(i => i + 2);
    };
    const addNasync = () => {
        setN(i => i + 1);
        console.log("第一次更新");
        setN(i => i + 1);
        console.log("第二次更新");
    };
    useEffect(
        () => {
            console.log("n=" + n);
        }, [n]
    );
    useEffect(
        () => {
            setTimeout(() => {
                //测试计时器内是否是同步的，不与class组件的setState表现一样，那个是同步的，这个依旧是异步！
                addNasync();
            }, 1000);
            // objFn.callback = addNasync;
            document.body.addEventListener("click", addNasync);
            return () => {
                document.body.removeEventListener("click", addNasync);
            };
        }, []
    );

    return (
        <div className={"yr-useState"}>
            <h4>
                1、不可变值！setState踩坑！
            </h4>
            <div style={{margin: "1em auto"}}>
                <p>{"obj=" + JSON.stringify(obj)}</p>
                <Button onClick={() => set({name: "liuu"})} message={`局部更新obj name属性`}>
                </Button>
            </div>

            <div style={{margin: "1em auto"}}>
                <p>{"obj1=" + JSON.stringify(obj1)}</p>
                <Button onClick={Set1} message={`直接对obj.name更新，然后set(obj)`}/>
            </div>
            <div style={{margin: "1em auto"}}>
                <p>{"obj2=" + JSON.stringify(obj2)}</p>
                <Button onClick={Set2} message={`正规用法`}>
                </Button>
            </div>

            <Button message={"refresh"} onClick={refresh}/>
            <p>
                useState的更新，适合用新的值代替旧的值，完全代替旧值。不要在旧值的基础上更新旧值！
            </p>
            <h4>
                useState的参数可以是函数，只在挂载的时候执行一次，返回初始state!
            </h4>
            <div style={{margin: "1em auto"}}>
                <p>{"obj3=" + JSON.stringify(obj3)}</p>
                <Button onClick={Set3} message={`add1`}>
                </Button>
            </div>
            <h4>
                2、setState的参数最好是函数！
            </h4>
            <div style={{margin: "1em auto"}}>
                <p>
                    不写成函数，同一块作用域内2次setSate，第一次加1第二次加2。m会加3吗？
                    m =
                    {m}
                </p>
                <Button onClick={addM} message={`m+3`}>
                </Button>
            </div>
            <div style={{margin: "1em auto"}}>
                <p>
                    写成函数，同一块作用域内2次setSate，第一次加1第二次加2。n1会加3吗？
                    n =
                    {n1}
                </p>
                <Button onClick={addN1} message={`n1+3`}>
                </Button>
            </div>
            <p style={{margin: "1em auto"}}>
                不写成函数，为什么会出错了？因为同一块级作用域内，n+1的那个n值都是当前n的值！
                也就是说，第一次setState的值是1+1，第二次的值是1+2。
                而写成函数会成功，是因为函数传的是形参指代了state，而不是一个变量。函数代表了一段逻辑：把当前的state里的m
                加1，把当前state里的m加2。
            </p>
            <h4>
                异步执行
            </h4>
            <p>n={n}</p>
            <Button onClick={addNasync} message={"async n+2"}/>
            <p>
                查看控制台，发现打印的都是当前的n值！异步！
            </p>
            <h4>
                同步执行
            </h4>
            <p>
                看控制台的打印：因为是函数式，不是class，n在函数里执行的值，成了作用域范畴的依赖了，
                而函数式，每次更新后，就是一个新的作用域！！
                所以，我用了监听器，监听n的变化，每次变化，打印！
                而多次执行setState，每次执行后也打印，只是没必要打印n的值了！
            </p>
            <p>
                确实是在计时器，自定义事件里，还是同步的！
            </p>
        </div>
    );
};
export default UseState;