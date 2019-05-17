import React from "react";

interface IconProps {
    name: string;
}

const Icon: React.FunctionComponent<IconProps> = (props) => <span>{props.name}</span>;
export default Icon;