import Button from "../button/button";
import Toast from "./toast";
import * as React from "react";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {scopeClassName} from "../../helpers/classes";
import "./toast.example.scss";

const ToastExample: React.FunctionComponent = () => {
    const [time, setTime] = useState(0);
    const [current, setCurrent] = useState();
    const callback = () => {setTime(time - 1);};
    const intervalRef: MutableRefObject<{ set: () => void, timer: undefined | number }> =
        useRef({timer: 0, set: () => console.log("1")});
    //以前傻，不知道给个默认的无关大雅的值，结果各种判断，经验之谈！！！只要保证，它只是执行方受外界变量控制，执行。

    useEffect(
        () => {intervalRef.current.set = callback;}
    );
    const showToast = (message: string, config?: { [k: string]: any }) => {
        Toast(message, config);
        const tick = () => {
            intervalRef.current.set();
        };
        setTime(config && config.autoCloseDelay || 4);
        // @ts-ignore
        //这里对计时器的类有问题，我记得返回的是个数字，但是ts一直认为是node.Timeout，暂时忽略掉了
        intervalRef.current.timer = setInterval(() => {tick();}, 1000);
    };
    useEffect(
        () => {
            const timer = intervalRef.current!.timer;
            time === 0 && timer && clearInterval(timer);
            time === 0 && timer && (intervalRef.current!.timer = undefined);
            time === 0 && current >= 0 && setCurrent(null);
        }, [time]
    );
    const sc = scopeClassName("yr-toast-example");
    const lists = [
        <Button message={`点我,默认4s后消失`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast("点我干哈？默认4s后消失！")}/>,
        <Button message={`点我,我定2s后消失`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast("点我干哈？我定2s后消失", {autoCloseDelay: 2})}/>,
        <Button message={`点我,我定50s后消失,可点关闭，提前关闭`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast(
                        "点我干哈？我定50s后消失,点击关闭，可提前关闭！",
                        {
                            autoCloseDelay: 50,
                            closeText: "关闭",
                            closeCallback: () => setTime(0)
                        }
                    )}
        />,
    ];
    // useEffect(
    //     () => {
    //         showToast(
    //             "点我干哈？我定50s后消失,点击关闭，可提前关闭！",
    //             {
    //                 autoCloseDelay: 50,
    //                 closeText: "关闭",
    //                 closeCallback: () => setTime(0)
    //             }
    //         );
    //     },[]
    // );
    return (
        <div className="yr-toast-example">
            <ul>
                {
                    lists.map(
                        (list, index) =>
                            <li key={index}
                                onClick={() => !current && current !== 0 && setCurrent(index)}
                                className={sc("list")}>
                                {list}
                                {current === index && <span className={sc("timer")}>{time + "s"}</span>}
                            </li>
                    )
                }
            </ul>


        </div>
    );
};
export default ToastExample;