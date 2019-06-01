import * as React from "react";
import InputExample from "./input.example";
import CodeView from "../../helpers/code_view";


const InputDemo: React.FunctionComponent = () =>
    <div className="inputDemo">
        <CodeView path="input/input.example.tsx">
            <InputExample/>
        </CodeView>
    </div>;

export default InputDemo;