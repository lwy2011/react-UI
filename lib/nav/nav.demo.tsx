import CodeView from "../../helpers/code_view";
import * as React from "react";
import Nav1 from "./nav.example";
import Nav2 from "./nav.example1";


const NavDemo: React.FunctionComponent = () => {
    return (
        <div className="yr-popover-demo">
            <CodeView path={"nav/nav.example.tsx"}>
                <Nav1/>
            </CodeView>
            <CodeView path={"nav/nav.example1.tsx"}>
                <Nav2/>
            </CodeView>
        </div>
    );
};
export default NavDemo;