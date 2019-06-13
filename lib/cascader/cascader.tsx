import {scopeClassName} from "../../helpers/classes";
import * as React from "react";
import CascaderItem from "./cascaderItem";
import "./cascader.scss";
import {useEffect, useState} from "react";
import Icon from "../icon/icon";

export interface sourceItem {
    value: string,
    label?: string,
    children?: sourceItem[],
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    data: sourceItem[],
    placeholder?: string,
    scopedItemsBoxClassName?: string,
    update: (data: string) => void

}

const sc = scopeClassName("yr-cascader");
const Cascader: React.FunctionComponent<Props> =
    ({className, data, placeholder, scopedItemsBoxClassName, update, ...rest}) => {
        const [selector, setSelect] = useState<Array<sourceItem>>([]);
        const [visible, setVisible] = useState(false);
        const [dom, getDom] = useState<HTMLElement>();
        // const [result, getResult] = useState("");

        const clickItem = (item: sourceItem, ind: number) => {
            const val = ind === 0 ? [item] :
                (
                    ind > selector.length ? [...selector, item] :
                        [...selector.slice(0, ind - 1), item]
                );
            setSelect(val);

            console.log(ind, item, val);
        };
        const results = (data: sourceItem[]) =>
            data.reduce(
                (a, b) => a + (b ? b.value : ""), ""
            );

        useEffect(
            () => {
                update(results(selector));
            }, [selector]
        );
        const visibleSet = (e: React.MouseEvent) => {
            const node = e.target;
            !dom && e.target && getDom(node as HTMLElement);
            if (!dom) return setVisible(!visible);
            const clear = dom && dom.querySelector(".yr-cascader-clear");
            if (!clear) return setVisible(!visible);
            !(clear.contains(e.target as HTMLElement) || clear === e.target) &&
            setVisible(!visible);
            // console.log(e.target, dom, clear);
        };
        return (
            <div className={sc("", className)} {...rest}>
                <div className={sc("results")} onClick={visibleSet}>
                    {
                        selector.length === 0 ? placeholder :
                            results(selector)
                    }
                    {
                        selector.length > 0 &&
                        <Icon name={"close"}
                              onClick={() => setSelect([])}
                              className={sc("clear")}/>
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
                                                      className={selector[0] === item ? "active" : ""}
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
                                                                  className={selector[index + 1] === child ? "active" : ""}
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