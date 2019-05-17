import React from "react";
// import "../icons/weixin.svg";
// import "../icons/alipay.svg";
// import "../icons/QQ.svg";
import "./importicons.js";
import "./icon.scss";

interface IconProps extends React.SVGAttributes<SVGElement> {
    name: string;
}

const Icon: React.FunctionComponent<IconProps> = (props) =>
    <svg className="yr-icon" {...props}>
        <use xlinkHref={`#${props.name}`}/>
    </svg>;
export default Icon;