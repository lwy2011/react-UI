import {scopeClassName} from "../../helpers/classes";
import * as React from "react";
import CascaderItem from "./cascaderItem";
import "./cascader.scss";
import {useState} from "react";

export interface sourceItem {
    value: string,
    label?: string,
    children?: sourceItem[]
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    data: sourceItem[],
    placeholder?: string,
    scopedItemsBoxClassName?: string,
}

const sc = scopeClassName("yr-cascader");
const Cascader: React.FunctionComponent<Props> =
    ({className, data, placeholder, scopedItemsBoxClassName, ...rest}) => {
        const [selector, setSelect] = useState<Array<sourceItem>>([]);
        const [visible, setVisible] = useState(false);
        const clickItem = (item: sourceItem, ind: number) => {
            const val = ind === 0 ? [item] :
                (
                    ind > selector.length ? [...selector, item] :
                        [...selector.slice(0, ind - 1), item]
                );
            setSelect(val);
            console.log(ind, item, val);
        };
        return (
            <div className={sc("", className)} {...rest}>
                <div className={sc("results")} onClick={() => setVisible(!visible)}>
                    {
                        selector.length === 0 ? placeholder :
                            selector.reduce(
                                (a, b) => a + (b ? b.value : ""), ""
                            )
                    }
                </div>
                {
                    visible &&
                    <div className={sc("selectorBox", scopedItemsBoxClassName)}>
                        <div className={sc("items")}>
                            {
                                data.map(
                                    (item, index) =>
                                        <CascaderItem data={item}
                                                      key={index} onClick={() => clickItem(item, 0)}/>
                                )
                            }
                        </div>
                        {
                            selector.length > 0 &&
                            selector.map(
                                (item, index) => item.children &&
                                    <div className={sc("items")} key={index}>
                                        {
                                            item.children.map(
                                                (child, ind) =>
                                                    <CascaderItem data={child} key={ind}
                                                                  onClick={() => clickItem(child, index + 2)}/>
                                            )
                                        }
                                    </div>
                            )
                        }
                    </div>
                }
            </div>
        );
    };

export default Cascader;