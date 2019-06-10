import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";
import {tabType} from "./tabs-head";
import Icon from "../icon/icon";
import {useContext, useEffect, useRef} from "react";
import {TabsContext} from "./tabs.context";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    tab: tabType,
}


const TabsItem: React.FunctionComponent<Props> = ({className, children, tab, ...rest}) => {
    const {text, name, icon, right, disabled} = tab;
    const {current, set} = useContext(TabsContext);
    const div = document.createElement("div");
    const item = useRef(div);
    useEffect(
        () => {
            current === name && set(name, helpLine(), true);
        }, []
    );
    const helpLine = () => {
        const div = item.current;
        // console.log(div.getBoundingClientRect());
        const {width, left, bottom} = div ? div.getBoundingClientRect() : {width: 0, left: 0, bottom: 0};
        return {width: `${width}px`, left: `${left}px`, top: `${bottom - 0.5}px`};
    };
    const tabClick = () => {
        if (disabled) return;
        if (name === current) return;
        set(name, helpLine());
    };
    return (
        <div onClick={tabClick} ref={item}
             className={
                 classes(
                     `yr-tabs-item  
                     ${disabled ? "disabled" : ""} 
                     ${current === name ? "active" : ""}  
                     ${right ? "right" : ""}`, className)}
             {...rest}>
            {icon && <Icon name={icon}/>}
            {text && <span>{text}</span>}
        </div>
    );
};
export default TabsItem;

