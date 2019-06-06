import * as React from "react";
import "./toast.scss";
import ReactDom from "react-dom";
import classes from "../../helpers/classes";

interface props extends React.HTMLAttributes<HTMLDivElement> {
    show: boolean,
    message: string,
}

const ToastDom: React.FunctionComponent<props> = ({message, className, show, ...rest}) => {
    const x = show &&
        <div className={classes("yr-toast", className)} {...rest}>
            {message}
        </div>;
    return ReactDom.createPortal(x, document.body);
};

const Toast = (message: string, configObj?: { [k: string]: any }) => {
    const config = {
        autoClose: true,
        autoCloseDelay: 4,
        ...configObj
    };

        const div = document.createElement("div");
    document.body.appendChild(div);

    const close = () => {
            ReactDom.render(React.cloneElement(Dom, {show: false}), div);
            ReactDom.unmountComponentAtNode(div);
            div.remove();
        };

        const Dom = <ToastDom message={message} show={true}/>;
        ReactDom.render(Dom, div);
    return config.autoClose && setTimeout(
        () => close(), config.autoCloseDelay * 1000
    );
    }
;
export default Toast;