import CodeView from "../../helpers/code_view";
import PopoverExample from "./popover.example";
import * as React from "react";
import PopoverExample1 from "./popover.example1";


const PopoverDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"popover/popover.example.tsx"}>
                <PopoverExample/>
            </CodeView>
            <CodeView path={"popover/popover.example1.tsx"}>
                <PopoverExample1/>
            </CodeView>
        </div>
    );
};
export default PopoverDemo;