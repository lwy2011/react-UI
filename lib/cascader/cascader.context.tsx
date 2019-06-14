import {sourceItem} from "./cascader";
import * as React from "react";
import {useState} from "react";

interface props {
    selectors: sourceItem[],
    set: (data?: sourceItem, index?: number) => void
}

const cascaderContext = React.createContext<props>({selectors: [], set: (data, index) => {}});


const CascaderContextProvider: React.FunctionComponent = (props) => {
    const [selectors, setSelector] = useState<sourceItem[]>([]);
    const {Provider} = cascaderContext;
    const update = (data: sourceItem, index: number) => {
        console.log(data, index);
        if (!data) return setSelector([]);
        const res = index > selectors.length - 1 ? [...selectors, data] :
            index === 0 ? [data] :
                index === 1 ? [selectors[0], data] :
                    [...selectors.slice(0, index), data];
        setSelector(res);
    };
    console.log(selectors);
    return (
        <Provider value={{selectors: selectors, set: update}}>
            {props.children}
        </Provider>
    );
};

export {cascaderContext};
export default CascaderContextProvider;