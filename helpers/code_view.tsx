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
    const startStr = code.match(/<div.+/);
    const lastStr = code.match(/<\/div>/);
    const codeVal = code.slice(startStr.index - 1, lastStr.index).replace(startStr[0], "");

    // console.log(codeVal, startStr[0], startStr.index, code.match(/<\/div>/),);

    const [show, setShow] = useState(false);
    return (
        <React.Fragment>
            {props.children}
            {
                show &&
                <Highlight {...defaultProps} code={codeVal} language="jsx">
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
            <h4>
                <Button message={!show && "查看代码"} onClick={() => setShow(!show)} icon={show && "hidden"}/>
            </h4>
        </React.Fragment>
    );
};
export default CodeView;