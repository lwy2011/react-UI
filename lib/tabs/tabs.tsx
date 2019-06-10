import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";
import {TabsContextProvider} from "./tabs.context";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    defaultCurrent: string,
}

const Tabs: React.FunctionComponent<Props> = ({className, children, defaultCurrent, ...rest}) => {

    return (
        <div className={classes("yr-tabs", className)} {...rest}>
            <TabsContextProvider defaultCurrent={defaultCurrent}>
                {children}
            </TabsContextProvider>
        </div>
    );
};


export default Tabs;

