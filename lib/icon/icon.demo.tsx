import * as React from "react";
import CodeView from "../../helpers/code_view";
import IconExample from "./icon.example";


const IconDemo: React.FunctionComponent = () => {
    return (
        <CodeView path={"icon/icon.example.tsx"}>
            <IconExample/>
        </CodeView>
    );
};

export default IconDemo;