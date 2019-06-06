import * as React from "react";
import "./toast.scss";
import ReactDom from "react-dom";
import {scopeClassName} from "../../helpers/classes";

interface props extends React.HTMLAttributes<HTMLDivElement> {
    show: boolean,
    message: string,
    closeText?: string,
    close?: () => void
}

const ToastDom: React.FunctionComponent<props> = ({message, className, show, closeText, close, ...rest}) => {
    const sc = scopeClassName("yr-toast");
    const x = show &&
        <div className={sc("", className)} {...rest}>
            <div className={sc("text")}>
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
    autoClose: boolean,
    autoCloseDelay: number,
    closeText: string,
    closeCallback: undefined | (() => void),
}

const Toast = (message: string, configObj?: { [k: string]: any }) => {
    const config: configProps = {
        autoClose: true,
        autoCloseDelay: 4,
        closeText: "",
        closeCallback: undefined,
        ...configObj
    };

        const div = document.createElement("div");
    document.body.appendChild(div);

    const close = () => {
            ReactDom.render(React.cloneElement(Dom, {show: false}), div);
            ReactDom.unmountComponentAtNode(div);
            div.remove();
        };
    const clickToClose = () => {
        close();
        const {closeCallback} = config;
        closeCallback && closeCallback();
    };
    const Dom = <ToastDom message={message} show={true} closeText={config.closeText} close={clickToClose}/>;
        ReactDom.render(Dom, div);
    return config.autoClose && setTimeout(
        () => close(), config.autoCloseDelay * 1000
    );
    }
;
export default Toast;