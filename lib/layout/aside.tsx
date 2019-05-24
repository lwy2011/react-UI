import * as React from "react";
import {scopeClassName} from "../classes";

const sc = scopeClassName("yr-layout");

interface Props extends React.HTMLAttributes<HTMLElement> {

}

const Aside: React.FunctionComponent<Props> = ({className, ...rest}) => {
    return (
        <div className={sc("aside", className)}{...rest}>
            aside
        </div>
    );
};

export default Aside;