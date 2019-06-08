import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    defaultCurrent: string,
}

const Tabs: React.FunctionComponent<Props> = ({className, children, defaultCurrent, ...rest}) => {
    return (
        <div className={classes("yr-tabs", className)} {...rest}>
            {children}
        </div>
    );
};
export default Tabs;

