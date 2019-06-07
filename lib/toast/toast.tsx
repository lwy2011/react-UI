import * as React from "react";
import "./toast.scss";
import ReactDom from "react-dom";
import {scopeClassName} from "../../helpers/classes";
import {ReactNode} from "react";

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