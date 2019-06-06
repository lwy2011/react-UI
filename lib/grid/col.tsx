import * as React from "react";

import "./col.scss";
import {scopeClassName} from "../../helpers/classes";

interface mediaProps {[k: string]: number}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    span?: number,
    offset?: number,
    order?: number,
    gutter?: number,
    phone?: mediaProps,
    ipad?: mediaProps
    nerrowpc?: mediaProps,
    pc?: mediaProps,
    widePc?: mediaProps
}

const sc = scopeClassName("yr-col");

const Col: React.FunctionComponent<ColProps> =
    ({
         className, children, gutter, style, ...rest
     }) => {
        const classes = (keys: string[], props: { [k: string]: any }) => keys.map(
            key => {
                const val = props[key];
                const type = typeof val;
                return val === 0 || val ?
                    (
                        type === "number" ? `yr-col-${key}-${props[key]}` :
                            type === "object" &&
                            Object.keys(val).map(
                                prop => `yr-col-${key}-${prop}-${val[prop]}`
                            ).join(" ")
                    ) : "";
            }
        ).join(" ");

        const keys = ["span", "offset", "order", "phone", "ipad", "nerrowpc", "pc", "widePc"];
        const styles = gutter ? {...style, paddingLeft: gutter / 2, paddingRight: gutter / 2} : style;
        return (
            <div className={sc("", classes(keys, rest) + (className ? className : ""))}
                 style={styles} {...rest}>
                {children}
            </div>
        );
    };

export default Col;