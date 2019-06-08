import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";
import {Fragment} from "react";
import TabsPane from "./tabs-pane";

export interface tabContentType {
    content: any,
    name: string
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    contents: tabContentType[]
}

const TabsBody: React.FunctionComponent<Props> = ({className, children, contents, ...rest}) => {
    return (
        <div className={classes("yr-tabs", className)} {...rest}>
            {
                contents.map(
                    (content, index) =>
                        <Fragment key={index}>
                            <TabsPane content={content}/>
                        </Fragment>
                )
            }
        </div>
    );
};
export default TabsBody;

