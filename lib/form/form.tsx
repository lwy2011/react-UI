import * as React from "react";

import "./form.scss";
import {Fragment, ReactNode, useEffect, useState} from "react";
import Input from "../input/input";
import {scopeClassName} from "../../helpers/classes";
import Icon from "../icon/icon";

export interface newFormData {
    [k: string]: any
}

export interface FormRule {
    key: string,
    warning: string,
    testFn: (data: any) => boolean | undefined | null,
}

type FormRules = Array<FormRule>

// extends React.FormHTMLAttributes<React.FormEvent>
export interface errors {[k: string]: string[]}

interface Props {
    value: newFormData,
    fields: Array<{ name: string, label: string, input: { type: string } }>,
    buttons: ReactNode[],
    onChange: (value: newFormData) => void,
    rules?: FormRules,
    // warning?: { [k: string]: string },
    // errors?: errors,
    test?: boolean,
    testResult?: (data: errors) => void,
    warningStyle?: { [k: string]: string }
}

const Form: React.FunctionComponent<Props> = (props) => {
    console.log(props.value);
    const inputText = (value: string | number, name: string) => {
        const newFormDate = {...props.value, [name]: value};
        props.onChange(newFormDate);
    };
    const validator =
        (data: newFormData, rules: FormRules): newFormData => {
            const warning: any = {};
            rules.map(
                rule =>
                    !rule.testFn(data[rule.key]) ? (
                        Array.isArray(warning[rule.key]) ?
                            warning[rule.key].push(rule.warning) : warning[rule.key] = [rule.warning]
                    ) : warning
            );
            props.testResult && props.testResult(warning);
            return warning;
        };

    const [errors, setErrors] = useState<errors>({});
    const [errorsView, setErrorsView] = useState<number[]>([]);
    useEffect(
        () => {
            props.rules && props.test && setErrors(validator(props.value, props.rules));
        }, [props.test]
    );
    const sc = scopeClassName("yr-form");
    const errorStyle = props.warningStyle ? props.warningStyle : {};
    const errorShow = (index: number) => {
        const ind = errorsView.indexOf(index);
        return ind >= 0 ? errorsView.filter(
            (val, index) => index !== ind
        ) : [...errorsView, index];
    };

    return (
        <form className="yr-form">
            <table className="yr-form-table">
                <tbody>
                {
                    props.fields.map(
                        (data, index) => {
                            const {name, input} = data;
                            return (
                                <Fragment key={index}>
                                    <tr className={sc("tr")}>
                                        <td className={sc("td")}>
                                            <span>{data.label}</span>
                                        </td>
                                        <td className={sc("td")}>
                                            <Input type={input.type}
                                                   value={props.value[name]}
                                                   onChange={
                                                       (e) =>
                                                           inputText(e.target.value, name)}/>

                                        </td>
                                    </tr>
                                    {
                                        <tr className={sc("tr")}>
                                            <td className={sc("td")}/>
                                            <td className={sc({"td": true, errors: true})}>
                                                {
                                                    errors[name] ?
                                                        errors[name].map(
                                                            (val: string, ind) =>
                                                                (errorsView.indexOf(index) >= 0 ? true : ind === 0) &&
                                                                <p key={ind}
                                                                   className={errors[name].length === 1 ? "noIcon" : ""}
                                                                   style={
                                                                       {
                                                                           // "color": "#FF4D4F",
                                                                           // "fontSize": "12px",
                                                                           ...errorStyle
                                                                       }
                                                                   }>
                                                                    {
                                                                        ind === 0 && errors[name].length > 1 &&
                                                                        <Icon
                                                                            name={errorsView.indexOf(index) >= 0 ? "up" : "down"}
                                                                            onClick={() => setErrorsView(
                                                                                errorShow(index)
                                                                            )}/>
                                                                    }
                                                                    {val}
                                                                </p>
                                                        ) :
                                                        <p style={{"fontSize": "12px"}}>&nbsp;</p>
                                                }
                                            </td>
                                        </tr>
                                    }
                                </Fragment>
                            );
                        }
                    )
                }
                <tr className={sc("tr")}>
                    <td className={sc("td")}/>
                    <td className={sc("td")}>
                        {
                            props.buttons.map(
                                (button, index) =>
                                    <Fragment key={index}>
                                        {button}
                                    </Fragment>
                            )
                        }
                    </td>
                </tr>
                </tbody>
            </table>

        </form>
    );
};
export default Form;