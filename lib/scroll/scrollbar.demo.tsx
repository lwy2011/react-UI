import * as React from "react";
import ScrollBarExample from "./scrollbar.example";
import CodeView from "../../helpers/code_view";


const ScrollBarDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-scroll-bar-demo">
            <CodeView path={"scroll/scrollbar.example.tsx"}>
                <ScrollBarExample/>
            </CodeView>
        </div>
    );
};

export default ScrollBarDemo;