import * as React from "react";
import CodeView from "../../helpers/code_view";
import FormExample from "./form.example";
import FormExample1 from "./form.example1";


const FormDemo: React.FunctionComponent = () =>
    <div className="formDemos">
        <CodeView path="form/form.example.tsx">
            <FormExample/>
        </CodeView>
        <CodeView path="form/form.example1.tsx">
            <FormExample1/>
        </CodeView>
    </div>;

export default FormDemo;
