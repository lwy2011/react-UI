import CodeView from "../../helpers/code_view";
import * as React from "react";
import UseRef from "./useRef";


const UseRefDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/useRef.tsx"}>
                <UseRef/>
            </CodeView>
        </div>
    );
};
export default UseRefDemo;