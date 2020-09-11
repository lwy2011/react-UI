import React, {useState} from "react";
import Button from "../button/button";

interface Obj {
    name: string,
    age?: number
}

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
    const addM = () => {
        setM(m + 1);
        setM(m + 2);
    };
    const addN = () => {
        setN(i => i + 1);
        setN(i => i + 2);
    };
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

            <Button message={"refresh"} onClick={refresh}></Button>
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
                    写成函数，同一块作用域内2次setSate，第一次加1第二次加2。n会加3吗？
                    n =
                    {n}
                </p>
                <Button onClick={addN} message={`n+3`}>
                </Button>
            </div>
            <p style={{margin: "1em auto"}}>
                不写成函数，为什么会出错了？因为同一块级作用域内，n+1的那个n值都是当前n的值！
                也就是说，第一次setState的值是1+1，第二次的值是1+2。
                而写成函数会成功，是因为函数传的是形参指代了state，而不是一个变量。函数代表了一段逻辑：把当前的state里的m
                加1，把当前state里的m加2。
            </p>

        </div>
    );
};
export default UseState;