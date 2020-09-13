import CodeView from "../../helpers/code_view";
import * as React from "react";
import UseContext from "./useContext";


const UseContextDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"principle/useContext.tsx"}>
                <UseContext/>
            </CodeView>
        </div>
    );
};
export default UseContextDemo;