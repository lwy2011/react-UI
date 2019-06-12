import * as React from "react";
import Icon from "../lib/icon/icon";
import "./outputview.scss";
import {scopeClassName} from "./classes";

interface props extends React.HTMLAttributes<HTMLDivElement> {
    data: { [k: string]: string | number },
    string?: string
}

const OutputView: React.FunctionComponent<props> = ({data, string, ...rest}) => {
    const cs = scopeClassName("output-view-table");
    return (
        <table className={cs()} {...rest}>
            <tbody>
            {
                Object.keys(data).map(
                    key => <tr key={key} className={cs("tr")}>
                        <td className={cs("td")}>{key}</td>
                        <td className={cs("td")}><Icon name={"shi"}/></td>
                        <td className={cs("td")}>{data[key] || <Icon name={"kong"}/>}</td>
                    </tr>
                )
            }
            {
                string &&
                <div>
                    {string}
                </div>
            }
            </tbody>
        </table>
    );
};
export default OutputView;