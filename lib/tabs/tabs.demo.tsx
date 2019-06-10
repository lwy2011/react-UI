import CodeView from "../../helpers/code_view";
import * as React from "react";
import TabsExample from "./tabs.example";


const TabsDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-tabs-demo">
            <CodeView path={"tabs/tabs.example.tsx"}>
                <TabsExample/>
            </CodeView>
        </div>
    );
};

export default TabsDemo;