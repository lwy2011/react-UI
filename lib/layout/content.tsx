import * as React from "react";
import {scopeClassName} from "../../helpers/classes";

interface Props extends React.HTMLAttributes<HTMLElement> {

}

const sc = scopeClassName("yr-layout");
const Content: React.FunctionComponent<Props> = ({className, ...rest}) => {
    return (
        <div className={sc("content", className)}{...rest}>
            {rest.children}
        </div>
    );
};

export default Content;