import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";
import {useContext} from "react";
import TabsPane from "./tabs-pane";
import {TabsContext} from "./tabs.context";

export interface tabContentType {
    content: any,
    name: string
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    contents: tabContentType[]
}

const TabsBody: React.FunctionComponent<Props> = ({className, children, contents, ...rest}) => {
    const {current} = useContext(TabsContext);
    const val = contents.filter(
        (content) => content.name === current
    )[0];
    return (
        <div className={classes("yr-tabs-body", className)} {...rest}>
            {val && <TabsPane content={val}/>}
        </div>
    );
};
export default TabsBody;

