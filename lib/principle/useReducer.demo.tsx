import CodeView from "../../helpers/code_view";
import * as React from "react";
import UseReducer from "./useReducer";
import UseReducer1 from "./useReducer1";
import UseReducer2 from "./useReducer2";

const UseStateDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/useReducer.tsx"}>
                <UseReducer/>
            </CodeView>
            <CodeView path={"principle/useReducer1.tsx"}>
                <UseReducer1/>
            </CodeView>
            <CodeView path={"principle/useReducer2.tsx"}>
                <UseReducer2/>
            </CodeView>
        </div>
    );
};
export default UseStateDemo;