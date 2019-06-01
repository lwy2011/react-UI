import * as React from "react";
import Icon from "../lib/icon/icon";
import "./outputview.scss";

interface props {
    data: { [k: string]: string }
}

const OutputView: React.FunctionComponent<props> = (props) => {
    return (
        <ul className="output-view">
            {
                Object.keys(props.data).map(
                    key => <li key={key} className={"view-list"}>
                        <span>{key}</span>
                        <Icon name={"shi"}/>
                        <span>{props.data[key] || <Icon name={"kong"}/>}</span>
                    </li>
                )
            }
        </ul>
    );
};
export default OutputView;