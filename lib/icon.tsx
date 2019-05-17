import React from "react";
// import "../icons/weixin.svg";
// import "../icons/alipay.svg";
// import "../icons/QQ.svg";
import "./importicons.js";
import "./icon.scss";

interface IconProps {
    name: string;
}

const Icon: React.FunctionComponent<IconProps> = (props) =>
    <svg className="yr-icon">
        <use xlinkHref={`#${props.name}`}/>
    </svg>;
export default Icon;