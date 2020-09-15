import React, {useEffect, useState} from "react";
import CodeView from "../../helpers/code_view";
import fn, {fn1, fn2} from "./stale-closure.demo1";

() => {
};


const StaleClosure = () => {
    const [n, set] = useState(1);
    useEffect(
        () => {
            fn();
            fn1();
            fn2();

        }, []
    );

    useEffect(
        () => {
            const timer = setInterval(
                () => {
                    console.log("n=" + n);
                }, 2000
            );
            return () => clearInterval(timer);
        }, []
    );
    useEffect(
        () => {
            const timer = setInterval(
                () => {
                    console.log("时刻生成新操作：n=" + n);
                }, 2000
            );
            return () => clearInterval(timer);
        }, [n]
    );
    return (
        <div className={"yr-useState"}>
            <h4>
                过时的闭包！
            </h4>
            <p>
                源于尤大在使用了react hooks之后，对每次更新都是生成新的函数执行，
                老函数里的数据都会过时，
                对于还依赖那些老数据的逻辑来说，那些逻辑都过时了！
            </p>
            <p>
                比如，在useState那里的很多例子，尤其是在做同步更新验证那里，
                在控制台打印的n，一直都是
                一开始执行时的n值！
            </p>
            <p>
                看个类似原理的例子！
            </p>
            <CodeView path={"principle/stale-closure.demo1.tsx"}>
            </CodeView>
            <p>
                看完代码，打开控制台看输出！
                fn和fn1函数的执行，过时的闭包就是这样的意思！ 如何处理？
            </p>
            <p>
                fn1提供了一个实时更新新函数的思路。
                还有一种思路，就是x函数内部，不要关联外部的message，
                fn中x始终关联着第一次c函数执行时的message!
                x函数内直接关联val就可以了！
                看fn2的执行打印！
            </p>
            <p>
                在hooks里，useState的set的值不为函数时，
                多次set，就是如此的情况！所以，能用函数做参数就用函数！
            </p>
            <p>
                再做一个hooks的过时的闭包的例子：
            </p>
            <p>
                n={n}
            </p>
            <button onClick={() => set(i => i + 1)}>n++</button>
            <p>
                继续看控制台，在didMount的时候，加了一个计时器，
                每隔两秒，输出n,这时候，你改变n，无效的！
            </p>
            <p>
                用上面的一个思路，每当n变了，计时器重新设定！换成新的函数执行！
            </p>
            <p>
                设置一个监听n,注意计时器旧的要销毁！
            </p>
        </div>
    );
};
export default StaleClosure;