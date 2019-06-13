import * as React from "react";
import CodeView from "../../helpers/code_view";
import CascaderExample from "./cascader.example";


const CascaderDemo: React.FunctionComponent = () => {
    return (
        <div className={"yr-cascader-demo"}>
            <CodeView path={"cascader/cascader.example.tsx"}>
                <CascaderExample/>
            </CodeView>
        </div>
    );
};

export default CascaderDemo;