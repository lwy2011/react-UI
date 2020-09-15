import React, {
    useEffect, useLayoutEffect,
    useState
} from "react";

() => {
};


const UseEffect = () => {
    const lists = [
        "等同于componentDidMount使用，[]作为第二个参数",
        "等同于componentDidUpdated使用，[某个state属性]为监听依赖，成为第二个参数",
        "等同于componentWillUnmount使用，通过return",
        "第二个参数相当于加入了什么watcher。"
    ];
    const [m, setM] = useState(0);
    const [x, setX] = useState(0);
    const [y, setY] = useState(12);
    useEffect(
        () => {
            console.log("useEffect- undefined");
            setTimeout(() => {
                alert("每次渲染都执行了！延迟1s打出！");
            }, 1000);
        }
    );
    useEffect(
        () => {
            console.log("useEffect- []");
            setM(m + 1);
        }, []
    );
    useEffect(
        () => {
            console.log("useEffect - x");
            setY(y + 1);
        }, [x]
    );
    useLayoutEffect(() => {
        console.log("useLayoutEffect");
    });
    return (
        <div className={"yr-useState"}>
            <h4>
                副作用！
            </h4>
            <p>
                每次render后对环境的改变，叫副作用！
            </p>

            <ul>
                {
                    lists.map(
                        (val, ind) => <li key={val}>
                            {ind + 1}、{val}
                        </li>
                    )
                }
            </ul>
            <p>
                可以多个useEffect同时存在，按出现顺序依次执行！
            </p>
            <h4>
                不加[]，就是每次渲染都会执行！这里设置了一个1s后的计时器！
            </h4>
            <h4>
                加[],挂载和销毁时各执行一次！
            </h4>
            <p>
                挂载时执行了{m}次！
            </p>
            <h4>
                加[x],x变，字体就会变大就会执行！
            </h4>
            <p>
                这种情况，didMount的时候，也会执行！比较麻烦的是跟didUpdate的时候合在了一起！需要引入新的变量来判断！
            </p>
            <p style={{fontSize: y + "px"}}>
                x变！涉及到两次更新，第一次是x,第二次是字体变大！
                <button onClick={() => {
                    setX(x + 1);
                }}>x+1
                </button>
            </p>
            <h4>
                函数参数的返回值，在声明周期更新或者结束前，会处理掉某些副作用！
            </h4>
            <p>
                详情可以看看stale clotrue里的useEffect,return消除了计时器！
                不仅仅是在willUnmount的时候。[xxx]这种监听器，return 一个消除副作用，
                可以实现，更新xxx时
                消除，在组件卸载时，也执行！
            </p>
            <h4>
                useLayoutEffect 布局副作用
            </h4>
            <p>
                它是在挂在之前即将渲染组件的DOM的时刻预留的操作api!很鸡肋！也有第二个参数，类同于useEffect。
                记住，就是比useEffect更早执行就行了，那时候组件还即将渲染到页面上！
            </p>
        </div>
    );
};
export default UseEffect;