import CodeView from "../../helpers/code_view";
import * as React from "react";
import UseState from "./useState";


const UseStateDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/useState.tsx"}>
                <UseState/>
            </CodeView>
        </div>
    );
};
export default UseStateDemo;