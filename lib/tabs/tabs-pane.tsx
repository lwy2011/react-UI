import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";
import {tabContentType} from "./tabs-body";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    content: tabContentType
}

const TabsPane: React.FunctionComponent<Props> = ({className, children, content, ...rest}) => {
    return (
        <div className={classes("yr-tabs-pane", className)} {...rest}>
            {content.content}
        </div>
    );
};
export default TabsPane;

