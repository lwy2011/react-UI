import * as React from "react";
import Icon from "../lib/icon/icon";
import "./outputview.scss";
import {scopeClassName} from "./classes";

interface props {
    data: { [k: string]: string | number },
    string?: string
}

const OutputView: React.FunctionComponent<props> = (props) => {
    const cs = scopeClassName("output-view-table");
    return (
        <table className={cs()}>
            <tbody>
            {
                Object.keys(props.data).map(
                    key => <tr key={key} className={cs("tr")}>
                        <td className={cs("td")}>{key}</td>
                        <td className={cs("td")}><Icon name={"shi"}/></td>
                        <td className={cs("td")}>{props.data[key] || <Icon name={"kong"}/>}</td>
                    </tr>
                )
            }
            {
                props.string &&
                <div>
                    {props.string}
                </div>
            }
            </tbody>
        </table>
    );
};
export default OutputView;