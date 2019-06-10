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
    right?: boolean,
    disabled?: boolean
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    tabs: tabType[],
    extra?: { text?: string, icon?: string, name: string, click?: (e: React.MouseEvent, name: string) => void },
    extraNode?: ReactNode
}


const TabsHead: React.FunctionComponent<Props> = ({className, children, tabs, extra, extraNode, ...rest}) => {
    const [lineStyle, setStyle] = useState<{ [k: string]: string }>({transition: "all 0s"});
    const div = document.createElement("div");

    const head = useRef(div);
    const moveLine = (style: { [k: string]: number }, fix?: { transition: string } | undefined) => {
        const leftPadding = head.current.getBoundingClientRect().left;
        const left = style.left - leftPadding + "px";
        setStyle(
            {
                transform: `translateX(${left})`,
                width: style.width + "px",
                ...(fix ? fix : {})
            }
        );
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
                extra && <div className="yr-tabs-extra"
                              onClick={(e) => {
                                  extra.click &&
                                  extra.click(e, extra.name);
                              }}>
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

