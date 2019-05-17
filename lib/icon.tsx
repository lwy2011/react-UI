import React from "react";
import "../icons/weixin.svg";


interface IconProps {
    name: string;
}

const Icon: React.FunctionComponent<IconProps> = (props) => <span>
    <svg><use xlinkHref={`#${props.name}`}/></svg>
</span>;
export default Icon;