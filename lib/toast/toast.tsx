import * as React from "react";
import {ReactNode, useEffect, useState} from "react";
import "./toast.scss";
import ReactDom from "react-dom";
import {scopeClassName} from "../../helpers/classes";
import useInterval from "../interval/interval";

interface props extends React.HTMLAttributes<HTMLDivElement> {
    show: boolean,
    child?: ReactNode,
    message?: string,
    closeText?: string,
    close?: () => void,
    position: string
}

const ToastDom: React.FunctionComponent<props> = ({message, className, show, closeText, close, child, position, ...rest}) => {
    const sc = scopeClassName("yr-toast");
    const classNameFix = ["top", "middle", "bottom"].indexOf(position) >= 0 ?
        [`position-${position}`, className].filter(val => val).join(" ") : className;

    const x = show &&
        <div className={sc("", classNameFix)} {...rest}>
            <div className={sc("text")}>
                {child}
                {message}
            </div>
            {closeText && <div className={sc("line")}/>}
            {
                closeText &&
                <div className={sc("close")} onClick={close}>
                    {closeText}
                    {"id" + parseInt(Math.random() * 100 + "")}
                </div>
            }
        </div>;

    return ReactDom.createPortal(x, document.body);
};

interface configProps {
    message: string,
    autoClose: boolean,
    autoCloseDelay: number,
    closeText: string,
    closeCallback: undefined | (() => void),
    child: ReactNode,
    position: string,
}

const Toast = (configObj: { [k: string]: any }) => {
    if (configObj.showOnlyOne && configObj.hasCurrent) return;
    const config: configProps = {
        message: "",
        autoClose: true,
        autoCloseDelay: 4,
        closeText: "",
        closeCallback: undefined,
        child: undefined,
        position: "middle",
        ...configObj
    };

        const div = document.createElement("div");
    document.body.appendChild(div);

    const close = () => {
            ReactDom.render(React.cloneElement(Dom, {show: false}), div);
            ReactDom.unmountComponentAtNode(div);
            div.remove();
        };

    const timer = config.autoClose && setTimeout(
        () => close(), config.autoCloseDelay * 1000
    );
    const clickToClose = () => {
        timer && clearTimeout(timer);
        close();
        const {closeCallback} = config;
        closeCallback && closeCallback();
    };

    const Dom = <ToastDom message={config.message}
                          child={config.child}
                          position={config.position}
                          show={true}
                          closeText={config.closeText}
                          close={clickToClose}/>;
        ReactDom.render(Dom, div);
    return clickToClose;
    }
;
export default Toast;

interface onlyProps extends React.HTMLAttributes<HTMLDivElement> {
    config: { [k: string]: any }
}

const OnlyOneToast: React.FunctionComponent<onlyProps> = ({config, children, className, ...rest}) => {
    const fn = config.closeCallback;
    config.closeCallback = () => {
        setTime(0);
        fn && fn();
    };
    const [current, setCurrent] = useState();
    const sc = scopeClassName("yr-toast-one-show");
    const [time, setTime] = useState(0);
    // const timerRef = useRef({set: () => console.log(1), id: 0});
    // const callback = () => {setTime(time - 1);};
    // useEffect(
    //     () => { timerRef.current.set = callback; }
    // );
    useInterval(() => setTime(time - 1), 1, time);
    const create = () => {
        current && current();
        const now = Toast(config);
        // clearInterval(timerRef.current.id);
        setTime(config.autoCloseDelay || 4);
        // @ts-ignore
        // const tick = () => {
        //     timerRef.current.set();
        // };

        // @ts-ignore
        // timerRef.current.id = setInterval(
        //     () => tick(), 1000
        // );
        setCurrent(() => now);
    };


    useEffect(                  //时间到了的清零
        () => {
            // const {id} = timerRef.current;
            // time === 0 && id && clearInterval(id);
            // time === 0 && id && (timerRef.current.id = 0);
            time === 0 && setCurrent(undefined);
        }, [time]
    );

    return (
        <div className={sc("", className)} {...rest} onClick={create}>
            {children}
            <span style={{color: "red"}} className={sc("timer")}>{time + "s"}</span>
        </div>
    );
};

export {OnlyOneToast};