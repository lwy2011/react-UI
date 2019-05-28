import * as React from "react";
import classes from "../../helpers/classes";
import "./input.scss";
import Icon from "../icon/icon";
import {Fragment} from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FunctionComponent<Props> = ({className, ...rest}) => {
    return (
        <input className={classes("yr-input", className)} {...rest}/>
    );
};

export default Input;

interface IconProps extends Props {
    icon: Array<{ name: string, left: boolean }>,
    // onChange:React.ChangeEventHandler<HTMLInputElement>
}

const IconInput: React.FunctionComponent<IconProps> = ({className, icon, onChange, ...rest}) =>
    <div className={classes("yr-iconInput", className)}>
        {
            icon && icon.map((val, index) =>
                <Fragment key={index}>
                    <Icon name={val.name} className={val.left ? "left" : "right"}/>
                </Fragment>
            )
        }
        <Input {...rest} onChange={onChange}/>
    </div>;


export {IconInput};