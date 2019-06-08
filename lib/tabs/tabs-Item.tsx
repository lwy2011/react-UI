import * as React from "react";
import "./tabs.scss";
import classes from "../../helpers/classes";
import {tabType} from "./tabs-head";
import Icon from "../icon/icon";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    tab: tabType
}

const TabsItem: React.FunctionComponent<Props> = ({className, children, tab, ...rest}) => {
    const {text, name, icon} = tab;
    return (
        <div onClick={() => {console.log(name);}}
             className={classes("yr-tabs-item", className)}
             {...rest}>
            {text && <span>{text}</span>}
            {icon && <Icon name={icon}/>}
        </div>
    );
};
export default TabsItem;

