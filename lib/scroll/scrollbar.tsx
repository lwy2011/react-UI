import * as React from "react";

import "./scrollbar.scss";
import {scopeClassName} from "../../helpers/classes";
import scrollbarWidth from "../../helpers/scrollbarWidth";

interface props extends React.HTMLAttributes<HTMLDivElement> {

}

const ScrollBar: React.FunctionComponent<props> = ({children, className, ...rest}) => {
    const u = navigator.userAgent.indexOf("AppleWebKit");
    const margin = u >= 0 ? 0 : "-" + scrollbarWidth();
    // console.log(margin, "www");
    const sc = scopeClassName("yr-scroll-bar");
    return (
        <div className={sc("", className)} {...rest}>
            <div className={sc("inner")} style={{right: margin}}>
                {children}
            </div>
        </div>
    );
};
export default ScrollBar;