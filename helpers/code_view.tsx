import * as React from "react";
import Highlight, {defaultProps} from "prism-react-renderer";
import {useState} from "react";
import Button from "../lib/button/button";

interface Props {
    path: string
}

//'../lib/icon/icon.example.tsx'

const CodeView: React.FunctionComponent<Props> = props => {
    const code = require("!!raw-loader!../lib/" + props.path).default;
    const [show, setShow] = useState(false);
    return (
        <React.Fragment>
            {props.children}
            {
                show &&
                <Highlight {...defaultProps} code={code} language="jsx">
                    {({className, style, tokens, getLineProps, getTokenProps}) => (
                        <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({line, key: i})}>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({token, key})} />
                                ))}
                            </div>
                        ))}
                      </pre>
                    )}
                </Highlight>
            }
            <Button message={!show && "查看代码"} onClick={() => setShow(!show)} icon={show && "hidden"}/>
        </React.Fragment>
    );
};
export default CodeView;