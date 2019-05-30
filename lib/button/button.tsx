import React from "react";
import Icon from "../icon/icon";

import "./button.scss";
import {scopeClassName} from "../../helpers/classes";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    // onClick?: React.MouseEventHandler
    message?: string | false,
    icon?: string | false,
    right?: Boolean,
    loading?: Boolean,
    iconMargin?: string,
    state?: {
        [k: string]: boolean
    },
}

const sc = scopeClassName("yr-button");
const Button: React.FunctionComponent<ButtonProps> =
    ({message, icon, right, loading, className, iconMargin, onClick, state, ...rest}) => {
        const cases: string = loading ? "loading" : icon ? icon : "";
        const cases1 = state ? {"": true, ...state} : "";
        return (
            <div className={sc(cases1, className)}
                 {...rest}
                 onClick={(e) => !(state && state.disabled) && onClick && onClick(e)}>
                {
                    cases &&
                    <Icon name={cases}
                          style={right ? {"order": 2, "marginLeft": (iconMargin || ".5em")} : {"order": 1}}
                          className={loading ? "yr-icon-loading" : ""}/>
                }

                {
                    message &&
                    <span style={right ? {"order": 1} : icon ? {"order": 2, "marginLeft": (iconMargin || ".5em")} : {}}>
                        {message}
                    </span>
                }
            </div>
        );
    };


export default Button;