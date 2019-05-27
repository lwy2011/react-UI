import * as React from "react";
import CodeView from "../../helpers/code_view";
import FormExample from "./form.example";


const FormDemo: React.FunctionComponent = () =>
    <div className="formDemos">
        <CodeView path="form/form.example.tsx">
            <FormExample/>
        </CodeView>
    </div>;

export default FormDemo;
