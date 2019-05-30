import * as React from "react";
import "./formItem.scss";
import {Fragment, ReactElement} from "react";
import {scopeClassName} from "../../helpers/classes";

interface Props extends React.HTMLAttributes<ReactElement> {
    classes?: { [k: string]: boolean }
}

const sc = scopeClassName("yr-form");
const FormItem: React.FunctionComponent<Props> = ({classes, children, ...rest}) => {
    const classNames = classes || {};
    return (
        <Fragment>
            <tr className={sc({tr: true, item: true, ...classNames})}>
                {children}
            </tr>
        </Fragment>
    );
};

export default FormItem;