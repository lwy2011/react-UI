import * as React from "react";
import "./layout.scss";
import {ReactElement} from "react";
import Aside from "./aside";
import {scopeClassName} from "../../helpers/classes";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";

const sc = scopeClassName("yr-layout");

interface Props extends React.HTMLAttributes<HTMLElement> {
    children: ReactElement | Array<ReactElement>
}

const Layout: React.FunctionComponent<Props> = ({className, children, ...rest}) => {
    // console.log(children,);
    const childrenArr = children as Array<ReactElement>;
    const hasAside = !!(childrenArr.length > 0 &&
        childrenArr.reduce(
            (a, b) => a || b.type === Aside, false
        ));
    return (
        <div className={sc({"": true, hasAside}, className)} {...rest}>
            {children}
        </div>
    );
};

export default Layout;
export {Header, Layout, Content, Footer, Aside};