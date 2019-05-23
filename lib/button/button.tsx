import React from "react";
import Icon from "../icon/icon";

import "./button.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    message?: string,
    icon?: string,
    right?: Boolean,
    loading?: Boolean,
}

const Button: React.FunctionComponent<ButtonProps> = ({message, icon, right, loading, ...rest}) => {
    return <div className="yr-button" {...rest} >
        {icon && <Icon name={icon}
                       style={right ? {"order": 2, "marginLeft": ".5em"} : {"order": 1}}
                       className={loading ? "loading" : ""}
        />}
        {message && <span style={right ? {"order": 1} : icon ? {"order": 2, "marginLeft": ".5em"} : {}}>
            {message}
            </span>}
    </div>;
};

export default Button;