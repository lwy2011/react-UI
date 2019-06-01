import * as React from "react";
import CodeView from "../../helpers/code_view";
import Dialogs from "./dialog.example";
import Dialogs1 from "./dialog.example1";


const DialogDemo: React.FunctionComponent = () =>
    <div className="DialogDemo">
        <CodeView path="dialog/dialog.example.tsx">
            <Dialogs/>
        </CodeView>
        <CodeView path="dialog/dialog.example1.tsx">
            <Dialogs1/>
        </CodeView>
    </div>;

export default DialogDemo;