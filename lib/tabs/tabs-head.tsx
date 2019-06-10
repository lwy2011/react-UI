import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";
import {Fragment, ReactNode} from "react";
import TabsItem from "./tabs-Item";
import Icon from "../icon/icon";


export interface tabType {
    text: string,
    icon?: string,
    name: string,
    right?: boolean,
    disabled?: boolean
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    tabs: tabType[],
    extra?: { text?: string, icon?: string, name: string, click?: (e: React.MouseEvent, name: string) => void },
    extraNode?: ReactNode
}



const TabsHead: React.FunctionComponent<Props> = ({className, children, tabs, extra, extraNode, ...rest}) => {


    return (
        <div className={classes("yr-tabs-head", className)} {...rest} >
            {
                tabs.map(
                    (tab, index) =>
                        <Fragment key={index}>
                            <TabsItem tab={tab}/>
                        </Fragment>
                )
            }
            {
                extra && <div className="yr-tabs-extra"
                              onClick={(e) => {
                                  extra.click &&
                                  extra.click(e, extra.name);
                              }}>
                    {extra.text}
                    {extra.icon && <Icon name={extra.icon}/>}
                </div>
            }

            {
                extraNode
            }
        </div>
    );
};

export default TabsHead;

