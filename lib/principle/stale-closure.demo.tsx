import CodeView from "../../helpers/code_view";
import * as React from "react";
import StaleClosure from "./stale-closure";


const StaleClosureDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/stale-closure.tsx"}>
                <StaleClosure/>
            </CodeView>
        </div>
    );
};
export default StaleClosureDemo;