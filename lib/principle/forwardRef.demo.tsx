import CodeView from "../../helpers/code_view";
import * as React from "react";
import ForwardRef from "./forwardRef";


const ForwardRefDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/forwardRef.tsx"}>
                <ForwardRef/>
            </CodeView>
        </div>
    );
};
export default ForwardRefDemo;