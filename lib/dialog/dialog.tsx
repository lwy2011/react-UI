import * as React from "react";
import ReactDom from "react-dom";
import "./dialog.scss";
import {Fragment, ReactElement} from "react";
import Icon from "../icon/icon";
import {scopeClassName} from "../classes";


interface props extends React.HTMLAttributes<HTMLElement> {
    visible: Boolean,
    close: React.MouseEventHandler,
    maskClickToClose?: boolean,
    buttons?: Array<ReactElement>,
    title?: string
}


const sc = scopeClassName("yr-dialog");

const Dialog: React.FunctionComponent<props> = ({visible, children, buttons, close, title, maskClickToClose}) => {
    const x = visible && <Fragment>
        <div className={sc("mask")} onClick={(e) => maskClickToClose && close(e)}/>
        <div className="yr-dialog">
            <div className={sc("close")} onClick={close}>
                <Icon name="close"/>
            </div>
            {title && <header className={sc("header")}>
                <h3>{title}</h3>
            </header>}
            <main className={sc("main")}>{children}</main>
            {buttons && <footer className={sc("footer")}>
                {buttons!.map(
                    (value, index) => <Fragment key={index}>
                        {value}
                    </Fragment>
                )}
            </footer>}
        </div>
    </Fragment>;
    return (
        ReactDom.createPortal(x, document.body)
    );
};

Dialog.defaultProps = {
    maskClickToClose: false
};
const alert = (content: string) => {
    const component = <Dialog visible={true} maskClickToClose={true} close={
        () => {
            ReactDom.render(React.cloneElement(component, {visible: false})
                , div);
            ReactDom.unmountComponentAtNode(div);
            div.remove();
        }
    }>
        {content}
    </Dialog>;
    const div = document.createElement("div");
    document.body.append(div);
    ReactDom.render(component, div);
};
export {alert};
export default Dialog;