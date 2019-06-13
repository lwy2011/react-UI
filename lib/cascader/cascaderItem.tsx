import {scopeClassName} from "../../helpers/classes";
import * as React from "react";
import {sourceItem} from "./cascader";
import Icon from "../icon/icon";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    data: sourceItem
}

const sc = scopeClassName("yr-cascader-item");
const CascaderItem: React.FunctionComponent<Props> = ({className, data, ...rest}) => {
    return (
        <div className={sc("", className)} {...rest}>
            {data.value} <Icon name={"right"}/>
            {/*{*/}
            {/*    data.children &&*/}
            {/*        data.children.map(*/}
            {/*            (child,index)=><CascaderItem data={child} key={index}/>*/}
            {/*        )*/}
            {/*}*/}
        </div>
    );
};

export default CascaderItem;