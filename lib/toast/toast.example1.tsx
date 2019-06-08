import Button from "../button/button";
import Toast, {configProps} from "./toast";
import * as React from "react";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {scopeClassName} from "../../helpers/classes";
import "./toast.example.scss";

const ToastExample1: React.FunctionComponent = () => {
    const [time, setTime] = useState(0);  //记录toast 的关闭时间
    const [current, setCurrent] = useState();  ////它只是为了定位哪个按钮点了，然后把倒计时的秒数定位到那个按钮下面！
    const callback = () => {setTime(time - 1);};
    const intervalRef: MutableRefObject<{ set: () => void, timer: undefined | number }> =
        useRef({timer: 0, set: () => console.log("1")});
    //以前傻，不知道给个默认的无关大雅的值，结果各种判断，经验之谈！！！只要保证，它只是执行方受外界变量控制，执行。

    useEffect(
        () => {intervalRef.current.set = callback;}
    );
    const showToast = (config: configProps) => {
        Toast(config);
        const tick = () => {
            intervalRef.current.set();
        };
        setTime(config.autoCloseDelay || 4);  //4是我的toast默认的关闭秒数
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
                disabled={Boolean(time)}  //用的time去拦截点击
                onClick={
                    () => showToast({message: "点我干哈？默认4s后消失！"})}/>,
        <Button message={`点我,我定2s后消失`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast({message: "点我干哈？我定2s后消失", autoCloseDelay: 2})}/>,
        <Button message={`点我,我定5s后消失,可点关闭，提前关闭`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast(
                        {
                            message: "点我干哈？我定5s后消失,点击关闭，可提前关闭！",
                            autoCloseDelay: 5,
                            closeText: "关闭",
                            closeCallback: () => setTime(0)
                        }
                    )}
        />,
        <Button message={`点我,我定50s后消失,可点关闭，提前关闭`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast(
                        {
                            child: "点我干哈？我定50s后消失,点击关闭，可提前关闭！",
                            autoCloseDelay: 50,
                            closeText: "关闭",
                            closeCallback: () => setTime(0)
                        }
                    )}
        />,
        <Button message={`点我,我定50s后消失,可点关闭，提前关闭`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast(
                        {
                            child: <div>
                                <h4>{"点我干哈？我定50s后消失,点击关闭，可提前关闭！position默认为middle"}</h4>
                                <p style={{color: "red"}}>{"为所欲为，，，我接，，为所欲为！为所欲为，，，为所欲为"}</p>
                                <Button message={"吻我！"} icon={"guilian2"}
                                        onClick={() => alert("你问我爱你有多深？给钱！默认为顶部出现，想改，就看position配置")}/>
                            </div>,
                            autoCloseDelay: 50,
                            closeText: "关闭",
                            closeCallback: () => setTime(0)
                        }
                    )}
        />,
        <Button message={`点我,我定50s后消失,可点关闭，提前关闭,position:top`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast(
                        {
                            child: <div>
                                <h4>{"点我干哈？我定50s后消失,点击关闭，可提前关闭！"}</h4>
                                <p style={{color: "red"}}>{"为所欲为，，，我接，，为所欲为！为所欲为，，，为所欲为"}</p>
                                <Button message={"吻我！"} icon={"guilian2"}
                                        onClick={() => alert("你问我爱你有多深？给钱！")}/>
                            </div>,
                            position: "top",
                            autoCloseDelay: 50,
                            closeText: "关闭",
                            closeCallback: () => setTime(0)
                        }
                    )}
        />,
        <Button message={`点我,我定50s后消失,可点关闭，提前关闭,position:bottom`}
                disabled={Boolean(time)}
                onClick={
                    () => showToast(
                        {
                            child: <div>
                                <h4>{"点我干哈？我定50s后消失,点击关闭，可提前关闭！"}</h4>
                                <p style={{color: "red"}}>{"为所欲为，，，我接，，为所欲为！为所欲为，，，为所欲为"}</p>
                                <Button message={"吻我！"} icon={"guilian2"}
                                        onClick={() => alert("你问我爱你有多深？给钱！")}/>
                            </div>,
                            autoCloseDelay: 50,
                            closeText: "关闭",
                            closeCallback: () => setTime(0),
                            position: "bottom"
                        }
                    )}
        />
    ];

    return (
        <div className="yr-toast-example">
            <h4>{"用的time实现的点击拦截，计时器的依据是设置的延迟时间，看button的disabled属性！"}</h4>
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
export default ToastExample1;