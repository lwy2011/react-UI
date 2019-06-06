import * as React from "react";

import "./row.scss";
import {scopeClassName} from "../../helpers/classes";
import {Fragment} from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    gutter?: number,    //(16+n*8)px
    justify?: string,
    align?: string
}

const sc = scopeClassName("yr-row");

const Row: React.FunctionComponent<Props> = ({className, children, gutter, justify, align, ...rest}) => {
    const margin = gutter && `-${gutter / 2}px`;
    const gutterStyle = margin ? {marginLeft: margin, marginRight: margin} : {};
    const alignStyle = {alignItems: align, justifyContent: justify};
    const gutterLists = () => React.Children.map(
        children, (child: React.ReactElement) => {
            return React.cloneElement(child, {gutter: gutter});
        }
    ).map((val, index) => <Fragment key={index}>{val}</Fragment>);
    // console.log(gutterLists());
    return (
        <div className={sc("", className)} style={{...gutterStyle, ...alignStyle}} {...rest}>
            {
                gutter || align || justify ? gutterLists() :
                    children
            }
        </div>
    );
};

export default Row;