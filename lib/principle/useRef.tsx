import React, {
    useEffect,
    useRef,
    useState

} from "react";

() => {
};


const UseRef = () => {
    const [n, setN] = useState(1);
    const timer = setTimeout(() => {
    }, 500);
    const [m, setM] = useState(1);
    const ref = useRef(timer);
    const [clear, setClear] = useState(false);
    const setTimer = () => {
        clearTimeout(ref.current);
        if (clear) return;
        ref.current = setInterval(() => {
            setM(i => i + 1);
        }, 1000);
    };
    useEffect(
        () => {
            setTimer();   //初始化的时候的！
        }, [n]
    );
    useEffect(
        () => {
            setTimer();
        }, [clear]
    );
    const ref1 = useRef(1);
    useEffect(
        () => {
            console.log(99);
            alert("useEffect 可以监听到ref1.current的改变！");
        }, [ref1.current]
    );
    const ref2 = useRef(1);
    const [, setX] = useState();
    return (
        <div className={"yr-useState"}>
            <h4>
                useRef 保持组件更新后，某些数据是不变的！
            </h4>
            <p>
                源于react的函数式编程，组件更新，其实就是生成新的函数去执行。函数里的所有数据，变量，
                可能都是新的。总有想拿到某些值是不变的，比如说计时器，定时器，如果拿不到，就惨了！
            </p>
            <p>
                n = {n}
            </p>
            <button onClick={() => {
                setN(n + 1);
            }}>
                n+1,更新视图！
            </button>
            <p>
                组件内部的一个定时器的id = {timer},视图更新，函数重新执行，此timer不是彼timer!
            </p>
            <p>
                做个危险的，一个计时器，每1秒，m+1!如果每次更新都生成一个新的计时器，，，
            </p>
            <p>
                m={m}
            </p>
            <p>
                需要每次更新的时候，消除旧的计时器，生成新的计时器！当然，这也不能满足每1秒自增了，这不是重点。
            </p>
            <p>
                计时器的id，用ref来保存最好不过了！id= {ref.current}
            </p>
            <p>
                涉及到存储，不变，赋值操作，在函数式编程里，也就对象的属性操作了。
            </p>
            <h4>
                在组件里，ref的更新，不会引起视图的更新，只有视图更新的时候，ref的值才会真实地更新。
                先把计时器关掉，做下面的实验！
            </h4>
            <button onClick={() => {
                setClear(clear => !clear);
            }}>trigger 计时器 on / off
            </button>
            <p>
                点击改变ref1的值，视图不变！
            </p>
            <p>
                ref1.current = {ref1.current}
            </p>
            <button onClick={() => {
                ref1.current += 1;
                console.log(ref1.current); //这里说明它确实是变了！
            }}>ref1 +1
            </button>
            <p>
                ref更新，用useEffect监听ref的值，试试可以否！
                无法监听到！！所以，只能在修改到ref的值之后，就进行手动触发视图更新，比如setN。
            </p>
            <p>
                ref2.current = {ref2.current}
            </p>
            <button onClick={() => {
                ref2.current += 1;
                setX(Math.random());
            }}>
                ref2.current ++ ,并且执行setX手动触发更新！
            </button>
        </div>
    );
};
export default UseRef;