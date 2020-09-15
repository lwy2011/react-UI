import CodeView from "../../helpers/code_view";
import * as React from "react";
import MyHooks from "./myHook";


const MyHookDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/myHook.tsx"}>
                <MyHooks/>
            </CodeView>
        </div>
    );
};
export default MyHookDemo;