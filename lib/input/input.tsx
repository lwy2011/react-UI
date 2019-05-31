import * as React from "react";
import classes, {scopeClassName} from "../../helpers/classes";
import "./input.scss";
import Icon from "../icon/icon";
import {Fragment, ReactElement} from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FunctionComponent<Props> = ({className, ...rest}) => {
    return (
        <input className={classes("yr-input", className)} {...rest}/>
    );
};

export default Input;

interface IconProps extends Props {
    icon?: Array<{
        name: string,
        left: boolean,
        style?: { [k: string]: string },
        click?: (e: React.MouseEvent, name: string) => any
    }>,
    button?: ReactElement,
    borderbottomonly?: string
}

const isc = scopeClassName("yr-scopedInput-icon");
const psc = scopeClassName("yr-scopedInput-input");

const IconInput: React.FunctionComponent<IconProps> = ({className, icon, onChange, button, ...rest}) =>
    <div className={classes("yr-scopedInput", className)}>
        {
            icon && icon.map((val, index) =>
                <Fragment key={index}>
                    <Icon name={val.name}
                          style={val.style ? val.style : {}}
                          className={isc({left: val.left, right: !val.left, click: Boolean(val.click)})}
                          onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              return val.click && val.click(e, val.name);
                          }}/>
                </Fragment>
            )
        }
        <Input {...rest} onChange={onChange} className={psc(
            {
                "": true,
                "button": Boolean(button),
                left: Boolean(icon && icon.filter(val => val.left).length > 0),
                right: Boolean(icon && icon.filter(val => !val.left).length > 0),
            }, rest.borderbottomonly ? "yr-input-borderBottom" : ""
        )}/>

        {
            button && button
        }
    </div>;


export {IconInput};