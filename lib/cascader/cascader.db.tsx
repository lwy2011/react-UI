import {scopeClassName} from "../../helpers/classes";
import * as React from "react";
import CascaderItem, {RecursiveCascaderItem} from "./cascaderItem";
import "./cascader.scss";
import {useContext, useEffect, useState} from "react";
import Icon from "../icon/icon";

// import CascaderContextProvider, {cascaderContext} from "./cascader.context";

export interface sourceItem {
    value: string,
    label?: string,
    children?: sourceItem[]
}

export type loadType = (id: number, resolve: (value: dbType[]) => void, reject?: (reason?: any) => void) => void

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

    [k: string]: string | number | dbType[] | undefined
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
            const {id} = item;
            const over = {over: false};
            ajax(id).then(
                (res: dbType[]) => {
                    const copy = JSON.parse(JSON.stringify(data));
                    const result = filterFn(id, copy, over);
                    console.log(item, result, "res is", res);
                    result && (result.children = res);
                    setData(copy);
                    // const finalRes = result ? result : item
                    if (result) {
                        const val = index === 0 ? [result] : index === 1 ? [selector[0], result] :
                            // index === selector.length ? selector.push(result):
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
        // db && db.filter(
        //     item => item.parent_id === parent_id
        // );
        const ajax = (parent_id = 0) => {
            return new Promise(
                (resolve, reject) => {
                    loadFn(
                        parent_id, resolve, reject
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
                        selector.length > 1 &&
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
                                                    // console.log(child,item);
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
// const RecursiveCascader: React.FunctionComponent<Props> =
//     ({className, data, placeholder, scopedItemsBoxClassName, update, ...rest}) => {
//         const [visible, setVisible] = useState(false);
//         const [dom, getDom] = useState<HTMLElement>();
//         const {selectors, set} = useContext(cascaderContext);
//         const results = (data: sourceItem[]) =>
//             data.reduce(
//                 (a, b) => a + (b ? b.value : ""), ""
//             );
//         const visibleSet = (e: React.MouseEvent) => {
//             const node = e.target;
//             !dom && e.target && getDom(node as HTMLElement);
//             if (!dom) return setVisible(!visible);
//             const clear = dom && dom.querySelector(".yr-cascader-clear");
//             if (!clear) return setVisible(!visible);
//             !(clear.contains(e.target as HTMLElement) || clear === e.target) &&
//             setVisible(!visible);
//         };
//         return (
//             <div className={sc("", className)} {...rest}>
//                 <div className={sc("results")} onClick={visibleSet}>
//                     {
//                         selectors.length === 0 ? placeholder :
//                             results(selectors)
//                     }
//                     {
//                         selectors.length > 0 &&
//                         <Icon name={"close"}
//                               onClick={() => set()}
//                               className={sc("clear")}/>
//                     }
//                 </div>
//                 {
//                     visible && data &&
//                     <div className={sc("selectorBox", scopedItemsBoxClassName)}>
//                         <RecursiveCascaderItem data={data} level={0} selector={selectors[0]}/>
//                     </div>
//                 }
//             </div>
//         );
//     };
// const Cascader1: React.FunctionComponent<Props> = (props) => {
//     return (
//         <React.Fragment>
//             <CascaderContextProvider>
//                 <RecursiveCascader {...props}/>
//             </CascaderContextProvider>
//         </React.Fragment>
//     );
// };
// Cascader1.defaultProps = {
//     placeholder: "\u00A0"
// };
// export {Cascader1};

export default DBCascader;