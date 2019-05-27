import * as React from "react";

import "./form.scss";
import {Fragment, ReactElement} from "react";

export interface newFormData {
    [k: string]: any
}

interface Props {
    value: newFormData,
    fields: Array<{ name: string, label: string, input: { type: string } }>,
    buttons: ReactElement[],
    onChange: (value: newFormData) => void
}

const Form: React.FunctionComponent<Props> = (props) => {
    console.log(props.value);
    const inputText = (value: string | number, name: string) => {
        const newFormDate = {...props.value, [name]: value};
        props.onChange(newFormDate);
    };
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
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputText(e.target.value, name)}/>
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