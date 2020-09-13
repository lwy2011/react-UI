import CodeView from "../../helpers/code_view";
import * as React from "react";
import UseMemo from "./useMemo";


const UseMemoDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/useMemo.tsx"}>
                <UseMemo/>
            </CodeView>
        </div>
    );
};
export default UseMemoDemo;