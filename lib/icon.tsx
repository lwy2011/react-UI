import React from "react";
// import "../icons/weixin.svg";
// import "../icons/alipay.svg";
// import "../icons/QQ.svg";
import "./importicons.js";

interface IconProps {
    name: string;
}

const Icon: React.FunctionComponent<IconProps> = (props) => <span>
    <svg><use xlinkHref={`#${props.name}`}/></svg>
</span>;
export default Icon;