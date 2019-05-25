import * as React from "react";
import {scopeClassName} from "../../helpers/classes";

const sc = scopeClassName("yr-layout");

interface Props extends React.HTMLAttributes<HTMLElement> {

}

const Footer: React.FunctionComponent<Props> = ({className, ...rest}) => {
    return (
        <div className={sc("footer", className)}{...rest}>
            {rest.children}
        </div>
    );
};

export default Footer;