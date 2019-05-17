import React from "react";
import wechat from "../icons/weixin.svg";

console.log(wechat);

interface IconProps {
    name: string;
}

const Icon: React.FunctionComponent<IconProps> = (props) => <span>{props.name}</span>;
export default Icon;