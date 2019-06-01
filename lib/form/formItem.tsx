import * as React from "react";
import "./form.scss";
import "./formItem.scss";
import {Fragment, ReactElement} from "react";
import {scopeClassName} from "../../helpers/classes";

interface Props extends React.HTMLAttributes<ReactElement> {
    classes?: { [k: string]: boolean },
    type: string,
    cases?: boolean | undefined
}

const sc = scopeClassName("yr-form");
const FormItem: React.FunctionComponent<Props> = ({classes, children}) => {
    const classNames = classes || {};
    return (
        <Fragment>
            <tr className={sc({tr: true, item: true, ...classNames})}>
                {children}
            </tr>
        </Fragment>
    );
};

const FormHeader: React.FunctionComponent<Props> = ({classes, children}) => {
    const classNames = classes || {};
    return (
        <div className={sc({header: true, ...classNames})}>
            {children}
        </div>
    );
};
const FormFooter: React.FunctionComponent<Props> = ({classes, children}) => {
    const classNames = classes || {};
    return (
        <div className={sc({footer: true, ...classNames})}>
            {children}
        </div>
    );
};
const FormDIYitem: React.FunctionComponent<Props> = ({classes, children, cases}) => {
    const classNames = classes || {};
    return (
        <Fragment>
            {
                cases &&
                <div className={sc({diyItem: true, ...classNames})}>
                    {children}
                </div>
            }
        </Fragment>
    );
};
export {FormItem, FormFooter, FormHeader, FormDIYitem};