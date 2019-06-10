import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";
import {Fragment, ReactNode, useRef, useState} from "react";
import TabsItem from "./tabs-Item";
import Icon from "../icon/icon";

export interface tabType {
    text: string,
    icon?: string,
    name: string,
    right?: boolean
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    tabs: tabType[],
    extra?: { text?: string, icon?: string, name: string },
    extraNode?: ReactNode
}


const TabsHead: React.FunctionComponent<Props> = ({className, children, tabs, extra, extraNode, ...rest}) => {
    const [lineStyle, setStyle] = useState({transform: "0", width: "0"});
    const div = document.createElement("div");

    const head = useRef(div);
    const moveLine = (style: { [k: string]: number }) => {
        const leftPadding = head.current.getBoundingClientRect().left;
        const left = style.left - leftPadding + "px";
        setStyle({transform: `translateX(${left})`, width: style.width + "px"});
    };
    return (
        <div className={classes("yr-tabs-head", className)} {...rest} ref={head}>
            {
                tabs.map(
                    (tab, index) =>
                        <Fragment key={index}>
                            <TabsItem tab={tab} moveline={moveLine}/>
                        </Fragment>
                )
            }
            {
                extra && <div className="yr-tabs-extra" onClick={() => {console.log(extra.name);}}>
                    {extra.text}
                    {extra.icon && <Icon name={extra.icon}/>}
                </div>
            }
            <div className="yr-tabs-head-active-line" style={lineStyle}/>

            {
                extraNode
            }
        </div>
    );
};

export default TabsHead;

