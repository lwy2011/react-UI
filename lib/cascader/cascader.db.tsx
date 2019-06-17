import {scopeClassName} from "../../helpers/classes";
import * as React from "react";
import CascaderItem, {RecursiveCascaderItem} from "./cascaderItem";
import "./cascader.scss";
import {useContext, useEffect, useState} from "react";
import Icon from "../icon/icon";

import CascaderContextProvider, {cascaderContext} from "./cascader.context";
import windowClick from "./window.click";

export interface sourceItem {
    value: string,
    label?: string,
    children?: sourceItem[],
    isLeaf?: boolean
}

export type loadType = (resolve: (value: dbType[]) => void, item?: dbType, reject?: (reason?: any) => void) => void

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    placeholder?: string,
    scopedItemsBoxClassName?: string,
    update: (data: string) => void,
    db: dbType[],
    loadFn: loadType
}

export interface dbType {
    id: number,
    value: string,
    parent_id: number,
    children?: dbType[],
    isLeaf?: boolean,

    [k: string]: string | number | dbType[] | undefined | boolean
}

type filterType = (id: number, data: dbType[], over: { [k: string]: boolean }) => (dbType | undefined | false)

const sc = scopeClassName("yr-cascader");
const DBCascader: React.FunctionComponent<Props> =
    ({className, placeholder, scopedItemsBoxClassName, update, db, loadFn, ...rest}) => {
        const [selector, setSelect] = useState<Array<dbType>>([]);
        const [data, setData] = useState<dbType[]>([]);
        const [visible, setVisible] = useState(false);
        const [dom, getDom] = useState<HTMLElement>();

        const clickItem = (item: dbType, index: number) => {
            const over = {over: false};
            ajax(item).then(
                (res: dbType[]) => {
                    const copy = JSON.parse(JSON.stringify(data));
                    const result = filterFn(item.id, copy, over);
                    console.log(item, result, "res is", res);
                    res.length > 0 && result && (result.children = res);
                    setData(copy);
                    if (result) {
                        const val = index === 0 ? [result] : index === 1 ? [selector[0], result] :
                            [...selector.slice(0, index), result];
                        setSelect(val);
                        console.log(index, "index is", val);
                    }
                }
            );
        };

        const filterFn: filterType = (id, data, over) => {
            if (over.over) return;
            const result1 = data.filter(item => item.id === id)[0];
            !over.over && result1 && (over.over = Boolean(result1));
            if (result1) return result1;
            const hasChildren = data.map(item => item.children);
            return hasChildren.length > 0 &&
                hasChildren.map(
                    (item: dbType[]) => !over.over && item && filterFn(id, item, over)
                ).filter(item => item)[0];

        };

        const ajax = (item?: dbType) => {
            return new Promise(
                (resolve, reject) => {
                    const children = item && item.children;
                    const isLeaf = item && item.isLeaf;
                    children ? resolve(children) :
                        isLeaf ? resolve([]) :
                            loadFn(
                                resolve, item, reject
                            );
                }
            );
        };

        const results = (data: dbType[]) =>
            data.reduce(
                (a, b) => a + (b ? b.value : ""), ""
            );

        useEffect(
            () => {
                update(results(selector));
            }, [selector]
        );
        useEffect(
            () => {
                const box = dom && dom.parentElement;
                const click = box && dom &&
                    windowClick(() => {
                        setVisible(false);
                        console.log("zhixingle");
                    }, box, dom);
                click && visible && click.create();
            }, [visible]
        );
        const visibleSet = (e: React.MouseEvent) => {
            !data[0] &&
            ajax().then(
                (res: dbType[]) => {setData(res);},
                () => setVisible(false)
            );

            const node = e.target && (e.target as HTMLElement);
            !dom && node && getDom(node);
            if (!dom) return setVisible(!visible);
            const clear = dom && dom.querySelector(".yr-cascader-clear");
            if (!clear) return setVisible(!visible);
            !(clear.contains(node) || clear === node) &&
            setVisible(!visible);
        };

        return (
            <div className={sc("", className)} {...rest} >
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
                                        <CascaderItem
                                            db={item}
                                            className={selector[0] && selector[0].value === item.value ? "active" : ""}
                                            key={index} onClick={() => clickItem(item, 0)}/>
                                )
                            }
                        </div>
                        {
                            selector.map(
                                (item, index) => item.children &&
                                    <div className={sc("items")} key={index}>
                                        {
                                            item.children.map(
                                                (child, ind) => {
                                                    return <CascaderItem
                                                        db={child} key={ind}
                                                        className={selector[index + 1] && selector[index + 1].value === child.value ? "active" : ""}
                                                        onClick={() => clickItem(child, index + 1)}/>;
                                                }
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
DBCascader.defaultProps = {
    placeholder: "\u00A0"
};
const DBRecursiveCascader: React.FunctionComponent<Props> =
    ({className, db, placeholder, scopedItemsBoxClassName, update, loadFn, ...rest}) => {
        const [visible, setVisible] = useState(false);
        const [dom, getDom] = useState<HTMLElement>();
        const [data, setData] = useState<dbType[]>([]);
        const {selectors, set} = useContext(cascaderContext);
        const ajax = (item?: dbType) => {
            return new Promise(
                (resolve, reject) => {
                    const children = item && item.children;
                    const isLeaf = item && item.isLeaf;
                    children ? resolve(children) :
                        isLeaf ? resolve([]) :
                            loadFn(
                                resolve, item, reject
                            );
                }
            );
        };
        const results = (data: sourceItem[]) =>
            data.reduce(
                (a, b) => a + (b ? b.value : ""), ""
            );
        const visibleSet = (e: React.MouseEvent) => {
            !data[0] && ajax().then(
                (res: dbType[]) => {setData(res);},
                () => setVisible(false)
            );
            const node = e.target;
            !dom && e.target && getDom(node as HTMLElement);
            if (!dom) return setVisible(!visible);
            const clear = dom && dom.querySelector(".yr-cascader-clear");
            if (!clear) return setVisible(!visible);
            !(clear.contains(e.target as HTMLElement) || clear === e.target) &&
            setVisible(!visible);
        };
        const itemClick = (item: dbType, fn: () => void) => {
            ajax(item).then(
                (res: dbType[]) => {
                    res && res.length > 0 && (item.children = res);
                    console.log(item, "gengxin", res, "查到的孩子");
                    setData(data);
                    fn();
                }
            );
        };
        return (
            <div className={sc("", className)} {...rest}>
                <div className={sc("results")} onClick={visibleSet}>
                    {
                        selectors.length === 0 ? placeholder :
                            results(selectors)
                    }
                    {
                        selectors.length > 0 &&
                        <Icon name={"close"}
                              onClick={() => set()}
                              className={sc("clear")}/>
                    }
                </div>
                {
                    visible && data &&
                    <div className={sc("selectorBox", scopedItemsBoxClassName)}>
                        <RecursiveCascaderItem
                            ajax={itemClick}
                            data={data} level={0} selector={selectors[0]}/>
                    </div>
                }
            </div>
        );
    };
const DBCascader1: React.FunctionComponent<Props> = (props) => {
    return (
        <React.Fragment>
            <CascaderContextProvider>
                <DBRecursiveCascader {...props}/>
            </CascaderContextProvider>
        </React.Fragment>
    );
};
DBCascader1.defaultProps = {
    placeholder: "\u00A0"
};
export {DBCascader1};

export default DBCascader;