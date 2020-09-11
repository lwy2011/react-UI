import * as React from "react";
import {useEffect, useState} from "react";


const slidesContext = React.createContext({
    current: "",
    ids: [""],
    lock: false,
    set: (data: string, data1?: string[], lock?: boolean) => {}
});

interface Props {
    default: string,
    delay: number
}

const SlidesContextProvider: React.FunctionComponent<Props> = (props) => {
    const [current, setCurrent] = useState(props.default);
    const [ids, setIds] = useState([""]);
    const [lock, setLock] = useState(false);
    const {Provider} = slidesContext;

    const set = (data1: string, data2?: string[], lock?: boolean) => {
        setCurrent(data1);
        data2 && setIds(data2);
        lock && setLock(lock);
    };
    const getNext = (current: string) => {
        const index = ids.indexOf(current);
        return index < ids.length - 1 ? ids[index + 1] : ids[0];
    };
    const next = getNext(current);
    const timer = () => setTimeout(
        () => {
            setCurrent(next);
            // console.log(current, 555, getNext(current), ids, "current");
        }, props.delay * 1000
    );
    useEffect(
        () => {
            next && timer();
            // console.log("current变得");
        }, [current]
    );
    useEffect(
        () => {
            ids[0] && timer();
        }, [ids]
    );
    return (
        <Provider value={{current, ids, lock, set}}>
            {props.children}
        </Provider>
    );
};

export {SlidesContextProvider, slidesContext};