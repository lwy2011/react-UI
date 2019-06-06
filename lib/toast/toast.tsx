import * as React from "react";
import "./toast.scss";
import ReactDom from "react-dom";
import classes from "../../helpers/classes";

interface props extends React.HTMLAttributes<HTMLDivElement> {
    show: boolean,
    message: string
}

const ToastDom: React.FunctionComponent<props> = ({message, className, ...rest}) => {
    return (
        <div className={classes("yr-toast", className)} {...rest}>
            {message}
        </div>
    );
};
const Toast = (message: string) => {
        const div = document.createElement("div");
    document.body.appendChild(div);

    const close = () => {
            ReactDom.render(React.cloneElement(Dom, {show: false}), div);
            ReactDom.unmountComponentAtNode(div);
            div.remove();
        };

        const Dom = <ToastDom message={message} show={true}/>;
        ReactDom.render(Dom, div);
        console.log(message);

        return close;
    }
;
export default Toast;