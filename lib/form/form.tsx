import * as React from "react";

import "./form.scss";
import {Fragment, ReactNode, useEffect, useState} from "react";

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
    warning?: { [k: string]: string },
    // errors?: errors,
    test?: boolean,
    testResult?: (data: errors) => void
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

    useEffect(
        () => {
            props.rules && props.test && setErrors(validator(props.value, props.rules));
        }, [props.test]
    );
    return (
        <form className="yr-form">
            <ul>
                {
                    props.fields.map(
                        (data, index) => {
                            const {name, input} = data;
                            return (
                                <li key={index}>
                                    <span>{data.label}</span>
                                    <input type={input.type}
                                           value={props.value[name]}
                                           onChange={
                                               (e: React.ChangeEvent<HTMLInputElement>) =>
                                                   inputText(e.target.value, name)}/>
                                    {
                                        errors[name] &&
                                        <ul>
                                            {
                                                errors[name].map(
                                                    (val: string) =>
                                                        <li key={val}>
                                                            {val}
                                                        </li>
                                                )
                                            }
                                        </ul>
                                    }
                                </li>
                            );
                        }
                    )
                }
            </ul>
            <footer>
                {
                    props.buttons.map(
                        (button, index) => <Fragment key={index}>
                            {button}
                        </Fragment>
                    )
                }
            </footer>
        </form>
    );
};
export default Form;