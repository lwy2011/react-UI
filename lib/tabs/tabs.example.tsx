import Tabs from "./tabs";
import * as React from "react";
import TabsHead from "./tabs-head";
import TabsBody from "./tabs-body";


const TabsExample: React.FunctionComponent = () => {
    return (
        <div className="yr-tabs-example">
            <Tabs defaultCurrent={"我靠"}>
                <TabsHead
                    extra={{
                        icon: "user",
                        name: "user"
                    }}
                    tabs={[
                        {text: "美女", name: "women"},
                        {text: "科技", name: "science"},
                        {text: "生活", name: "life"},
                        {text: "家庭", name: "family"},
                    ]}/>
                <TabsBody contents={
                    [
                        {content: "美女", name: "women"},
                        {content: "科技", name: "science"},
                        {content: "生活", name: "life"},
                        {content: "家庭", name: "family"},
                    ]
                }/>
            </Tabs>
        </div>
    );
};

export default TabsExample;