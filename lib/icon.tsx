import React from "react";
// import "../icons/weixin.svg";
// import "../icons/alipay.svg";
// import "../icons/QQ.svg";
import "./importicons.js";
import "./icon.scss";

interface IconProps {
    name: string;
    onClick?: React.MouseEventHandler<SVGElement>
}

const Icon: React.FunctionComponent<IconProps> = (props) =>
    <svg className="yr-icon" onClick={props.onClick}>
        <use xlinkHref={`#${props.name}`}/>
    </svg>;
export default Icon;