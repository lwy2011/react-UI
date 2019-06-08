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

export interface configProps {
    message?: string,
    autoClose?: boolean,
    autoCloseDelay?: number,
    closeText?: string,
    closeCallback?: undefined | (() => void),
    child?: ReactNode,
    position?: string,
}

const Toast = (configObj: configProps) => {
    const config = {
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
        const {closeCallback} = config;
        closeCallback && closeCallback();
        };

    const timer = config.autoClose && setTimeout(
        close, config.autoCloseDelay * 1000
    );
    const clickToClose = () => {
        timer && clearTimeout(timer);
        close();
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
    config: configProps
}

const OnlyOneToast: React.FunctionComponent<onlyProps> =
    ({config, children, className, ...rest}) => {
        const fn = config.closeCallback;
        config.closeCallback = () => {
            setTimer(0);
            fn && fn();
        };


        const [currentClose, setCurrentClose] = useState();
        const sc = scopeClassName("yr-toast-one-show");
        const [time, setTimer] = useState(0);
        const [createLock, setCreate] = useState(false);
        const [closeLock, setClose] = useState(false);
        // const timerRef = useRef({set: () => console.log(1), id: 0});
        // const callback = () => {setTimer(time - 1);};
        // useEffect(
        //     () => { timerRef.current.set = callback; }
        // );
        useInterval(() => setTimer(time - 1), 1, time);

        const create = () => {
            const now = Toast(config);
            // clearInterval(timerRef.currentClose.id);
            // // @ts-ignore
            // const tick = () => {
            //     timerRef.current.set();
            // };
            // const {id} = timerRef.current;
            // id && clearInterval(id);
            setTimer(config.autoCloseDelay || 4);

            // @ts-ignore
            // timerRef.current.id = setInterval(
            //     tick, 1000
            // );

            setCurrentClose(() => now);
            setClose(false);
            setCreate(false);
        };
        const close = () => {
            currentClose && currentClose();
            setCurrentClose(undefined);
            setTimer(0);
        };
        useEffect(
            () => {
                createLock && create();

            }, [createLock]
        );

        useEffect(                  //时间到了的清零
            () => {
                closeLock && !createLock && setCreate(true);
                closeLock && !createLock && close();
                // const {id} = timerRef.current;
                // time === 0 && id && clearInterval(id);
                // time === 0 && id && (timerRef.current.id = 0);
                // time === 0 && setCurrentClose(undefined);
            }, [closeLock]
        );

        return (
            <div className={sc("", className)} {...rest} onClick={() => setClose(true)}>
                {children}
                <span style={{color: "red"}} className={sc("timer")}>{time + "s"}</span>
            </div>
        );
    };

export {OnlyOneToast};