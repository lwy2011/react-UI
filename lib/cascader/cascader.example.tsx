import * as React from "react";
import Cascader from "./cascader";
import area from "../../helpers/data/area";

const CascaderExample: React.FunctionComponent = () => {
    return (
        <div className={"yr-cascader-example"}>
            <Cascader
                placeholder={"请选择"}
                data={area}/>
        </div>
    );
};

export default CascaderExample;