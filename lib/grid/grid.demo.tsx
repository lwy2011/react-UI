import GridExample from "./grid.example";
import * as React from "react";
import CodeView from "../../helpers/code_view";
import GridExample1 from "./grid.example1";
import GridExample2 from "./grid.example2";
import GridExample3 from "./grid.example3";
import GridExample4 from "./grid.example4";
import GridExample5 from "./grid.example5";


const GridDemo: React.FunctionComponent = () => {
    return (
        <div className="gridDemo">
            <CodeView path={"grid/grid.example.tsx"}>
                <GridExample/>
            </CodeView>
            <CodeView path={"grid/grid.example1.tsx"}>
                <GridExample1/>
            </CodeView>
            <CodeView path={"grid/grid.example2.tsx"}>
                <GridExample2/>
            </CodeView>
            <CodeView path={"grid/grid.example3.tsx"}>
                <GridExample3/>
            </CodeView>
            <CodeView path={"grid/grid.example4.tsx"}>
                <GridExample4/>
            </CodeView>
            <CodeView path={"grid/grid.example5.tsx"}>
                <GridExample5/>
            </CodeView>
        </div>
    );
};

export default GridDemo;