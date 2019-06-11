import CodeView from "../../helpers/code_view";
import PopoverExample from "./popover.example";
import * as React from "react";


const PopoverDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"popover/popover.example.tsx"}>
                <PopoverExample/>
            </CodeView>
        </div>
    );
};
export default PopoverDemo;