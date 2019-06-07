import CodeView from "../../helpers/code_view";
import * as React from "react";
import ToastExample from "./toast.example";
import ToastExample1 from "./toast.example1";


const ToastDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-toast-demo">
            <CodeView path={"toast/toast.example1.tsx"}>
                <ToastExample1/>
            </CodeView>
            <CodeView path={'toast/toast.example.tsx'}>
                <ToastExample/>
            </CodeView>
        </div>
    );
};
export default ToastDemo;