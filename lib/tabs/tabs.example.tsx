import Tabs from "./tabs";
import * as React from "react";
import TabsHead from "./tabs-head";
import TabsBody from "./tabs-body";


const TabsExample: React.FunctionComponent = () => {
    const user = {age: 10};

    return (
        <div className="yr-tabs-example">
            <Tabs defaultCurrent={"life"}>
                <TabsHead
                    extra={{
                        icon: "user",
                        name: "user",
                        click: (e: React.MouseEvent, name: string) => {
                            console.log(e.target, name);
                        }
                    }}
                    tabs={[
                        {text: "美女", name: "women", icon: "women", disabled: Boolean(user.age < 18)},
                        {text: "科技", name: "science"},
                        {text: "生活", name: "life"},
                        {text: "家庭", name: "family", icon: "family", right: true},
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