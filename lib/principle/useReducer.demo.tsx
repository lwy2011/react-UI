import CodeView from "../../helpers/code_view";
import * as React from "react";
import UseReducer from "./useReducer";


const UseStateDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/useReducer.tsx"}>
                <UseReducer/>
            </CodeView>
        </div>
    );
};
export default UseStateDemo;