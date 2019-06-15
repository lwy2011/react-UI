import * as React from "react";
import Cascader, {Cascader1} from "./cascader";
import areaData from "../../helpers/data/area.obj";
import {useState} from "react";
import OutputView from "../../helpers/outputView";
import "./cascader.example.scss";
import areaDB from "../../helpers/data/db";
import DBCascader from "./cascader.db";

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
            <DBCascader
                update={update}
                db={areaDB}
                placeholder={"请选择，迭代思路"}
            />
        </div>
    );
};

export default CascaderExample;