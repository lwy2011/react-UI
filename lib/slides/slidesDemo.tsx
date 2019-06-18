import * as React from "react";
import CodeView from "../../helpers/code_view";
import SlidesExample from "./slides.example";


const SlidesDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-slides-demo">
            <CodeView path={"slides/slides.example.tsx"}>
                <SlidesExample/>
            </CodeView>
        </div>
    );
};

export default SlidesDemo;