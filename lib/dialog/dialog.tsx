import * as React from "react";
import ReactDom from "react-dom";
import "./dialog.scss";
import {Fragment, ReactElement, ReactNode} from "react";
import Button from "../button/button";
import {scopeClassName} from "../../helpers/classes";


interface props extends React.HTMLAttributes<HTMLElement> {
    visible: Boolean,
    close?: React.MouseEventHandler,
    maskClickToClose?: boolean,
    buttons?: Array<ReactElement>,
    title?: string,
    maskNeed?: boolean
}


const sc = scopeClassName("yr-dialog");

const Dialog: React.FunctionComponent<props> = ({visible, children, buttons, close, title, maskClickToClose, maskNeed}) => {
    const x = visible && <Fragment>
        {maskNeed && <div className={sc("mask")} onClick={(e) => maskClickToClose && close && close(e)}/>}
        <div className="yr-dialog">
            <Button className={sc("close", "yr-button-close")} onClick={close ? close : () => ""} icon="close"/>

            {title && <header className={sc("header")}>
                <h3>{title}</h3>
            </header>}
            <main className={sc("main")}>{children}</main>
            {buttons && <footer className={sc("footer")}>
                {
                    buttons && buttons[0] && buttons.map(
                        (value, index) => <Fragment key={index}>
                            {value}
                        </Fragment>
                    )
                }
            </footer>}
        </div>
    </Fragment>;
    return (
        ReactDom.createPortal(x, document.body)
    );
};

Dialog.defaultProps = {
    maskClickToClose: false, maskNeed: true
};

const modal = (content: ReactNode, buttons?: Array<ReactElement>) => {
    const div = document.createElement("div");
    document.body.append(div);
    const closeFn = () => {
        ReactDom.render(React.cloneElement(component, {visible: false})
            , div);
        ReactDom.unmountComponentAtNode(div);
        div.remove();
    };
    const component =
        <Dialog visible={true}
                maskClickToClose={true}
                buttons={buttons}
                close={closeFn}>
            {content}
        </Dialog>;

    ReactDom.render(component, div);
    return closeFn;
};
const alert = (content: ReactNode) => {
    const buttons = [<Button message="ok" onClick={() => alert()}/>];
    const alert = modal(content, buttons);
};
const confirm = (content: ReactNode, yes?: () => void, no?: () => void) => {
    const buttons = [
        <Button message="yes" onClick={() => {
            closeFn();
            yes && yes();
        }}/>,
        <Button message="no" onClick={() => {
            closeFn();
            no && no();
        }}/>
    ];
    const closeFn = modal(content, buttons);
};


export {alert, confirm, modal};
export default Dialog;