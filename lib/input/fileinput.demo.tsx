import * as React from "react";
import CodeView from "../../helpers/code_view";
import FileinputExample from "./fileinput.example";


const FileInputDemo: React.FunctionComponent = () =>
    <div className="inputDemo">
        <CodeView path="input/fileinput.example.tsx">
            <FileinputExample/>
        </CodeView>
    </div>;

export default FileInputDemo;