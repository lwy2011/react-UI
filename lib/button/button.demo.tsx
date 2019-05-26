import * as React from "react";
import Buttons from "./button.example";
import CodeView from "../../helpers/code_view";
import Buttons2 from "./button.example2";
import Buttons1 from "./button.example1";


const ButtonDemo: React.FunctionComponent = () => {
    return (
        <div className="buttonDemo">
            <CodeView path="button/button.example1.tsx">
                <Buttons1/>
            </CodeView>
            <CodeView path="button/button.example2.tsx">
                <Buttons2/>
            </CodeView>
            <CodeView path="button/button.example.tsx">
                <Buttons/>
            </CodeView>
        </div>
    );
};

export default ButtonDemo;