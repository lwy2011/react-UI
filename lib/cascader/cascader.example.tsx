import * as React from "react";
import Cascader, {Cascader1} from "./cascader";
import areaData from "../../helpers/data/area.obj";
import {useState} from "react";
import OutputView from "../../helpers/outputView";
import "./cascader.example.scss";
// console.log(areaData,'222');

const CascaderExample: React.FunctionComponent = () => {
    const [value, setValue] = useState("");
    const update = (data: string) => setValue(data);

    return (
        <div className={"yr-cascader-example"}>
            <OutputView data={{
                value: value,
            }}/>
            <Cascader
                update={update}
                placeholder={"请选择，迭代思路"}
                data={areaData}/>

            <Cascader1
                update={update}
                placeholder={"请选择,递归思路"}
                data={areaData}/>
        </div>
    );
};

export default CascaderExample;