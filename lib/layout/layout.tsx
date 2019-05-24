import * as React from "react";
import {scopeClassName} from "../classes";
import "./layout.scss";

const sc = scopeClassName("yr-layout");

interface Props extends React.HTMLAttributes<HTMLElement> {

}

const Layout: React.FunctionComponent<Props> = ({className, children, ...rest}) => {
    return (
        <div className={sc("", className)} {...rest}>
            {children}
        </div>
    );
};

export default Layout;