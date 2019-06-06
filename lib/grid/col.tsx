import * as React from "react";

import "./col.scss";
import {scopeClassName} from "../../helpers/classes";

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    span?: number,
    offset?: number,
    order?: number,
    gutter?: number
}

const sc = scopeClassName("yr-col");

const Col: React.FunctionComponent<ColProps> = ({className, children, span, offset, order, gutter, ...rest}) => {
    const type1 = span ? {[`span-${span}`]: true} : {};
    const type2 = offset ? {[`offset-${offset}`]: true} : {};
    const type3 = order ? {[`order-${order}`]: true} : {};
    const type4 = gutter ? {paddingLeft: gutter / 2, paddingRight: gutter / 2} : {};
    return (
        <div className={sc({"": true, ...type1, ...type2, ...type3}, className)}
             style={type4} {...rest}>
            {children}
        </div>
    );
};

export default Col;