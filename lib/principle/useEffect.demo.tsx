import CodeView from "../../helpers/code_view";
import * as React from "react";
import UseEffect from "./useEffect";


const UseEffectDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/useEffect.tsx"}>
                <UseEffect/>
            </CodeView>
        </div>
    );
};
export default UseEffectDemo;