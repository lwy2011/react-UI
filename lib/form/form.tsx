import * as React from "react";

import "./form.scss";
import {Fragment, ReactElement} from "react";

interface Props {
    value: { [k: string]: any },
    fields: Array<{ name: string, label: string, input: { type: string } }>,
    buttons: ReactElement[]
}

const Form: React.FunctionComponent<Props> = (props) => {
    return (
        <form className="yr-form">
            <ul>
                {
                    props.fields.map(
                        val => <li key={val.name}>
                            <span>{val.label}</span>
                            <input type={val.input.type}/>
                        </li>
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