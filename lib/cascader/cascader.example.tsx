import * as React from "react";
import Cascader, {Cascader1} from "./cascader";
import areaData from "../../helpers/data/area.obj";
import {useState} from "react";
import OutputView from "../../helpers/outputView";
import "./cascader.example.scss";
import areaDB from "../../helpers/data/db";
import DBCascader, {DBCascader1, loadType} from "./cascader.db";

const CascaderExample: React.FunctionComponent = () => {
    const [value, setValue] = useState("");
    const update = (data: string) => setValue(data);
    const loadFn: loadType = (resolve, selector) => {
        setTimeout(
            () => {
                const id = selector ? selector.id : 0;
                const res = areaDB.filter(item => item.parent_id === id);
                const fix = res.length > 0 && res.map(
                    item => {
                        const filter = areaDB.filter(v => v.parent_id === item.id)[0];
                        return {...item, isLeaf: !Boolean(filter)};
                    }
                );
                resolve(fix || res);
            }, 1500
        );
    };
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
                loadFn={
                    loadFn
                }
                update={update}
                db={areaDB}
                placeholder={"请选择，迭代思路，动态请求数据，并渲染筛选"}
            />
            <DBCascader1
                loadFn={
                    loadFn
                }
                update={update}
                db={areaDB}
                placeholder={"请选择，递归思路，动态请求数据，并渲染筛选"}
            />
        </div>
    );
};

export default CascaderExample;