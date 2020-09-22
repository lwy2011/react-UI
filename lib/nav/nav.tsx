import React, {HTMLAttributes, ReactNode, RefObject, useEffect, useRef, useState} from "react";
import classes from "../../helpers/classes";
import "./nav.scss";
import SubNav from "./sub-nav";

export interface Item {
    name: string,
    sub?: Item[],
    slotFn?: (visible: boolean) => ReactNode,
    disabled?: boolean,

    [propName: string]: any
}

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: Item[],
    updated?: (arr: string[]) => void,
    mode?: "vertical" | "horizontal",
    multiple?: boolean
}
type Store1 = Array<{ [k: string]: string }>
export const Context = React.createContext(
    {
        store: ["3"],
        setStore: (val: string[]) => {
        },
        visible: true,
        setVisible: (val: boolean) => {
        },
        mode: "vertical",
        multiple: false,
        store1: [] as Store1
    }
);
const Lists = ({
                   data, className, mode,
                   ...rest
               }: Props,
               ref: RefObject<HTMLDivElement>) =>
    <div className={classes(className, "yr-nav", mode)} {...rest} ref={ref}>
        {
            data.map(
                item => <SubNav key={item.name} data={item} level={0}/>
            )
        }
    </div>;
const NavBars = React.forwardRef(Lists);
const Nav = ({
                 multiple, className,
                 updated,
                 data, ...rest
             }: Props) => {
    const [store, setStore] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);
    const ref = useRef(document.body as HTMLDivElement);
    useEffect(
        () => {
            const content = ref.current;
            const callback = (e: MouseEvent) => {
                if (content) {
                    if (content.contains(e.target as HTMLElement) || content === e.target) return;
                    setVisible(false);
                }
            };
            document.body.addEventListener(
                "click", callback
            );
            return () => {
                document.body.removeEventListener(
                    "click", callback
                );
            };
        }, []
    );
    useEffect(
        () => {
            updated && updated(store);
        }, [store]
    )
    return <Context.Provider value={{
        store,
        setStore: (val) => {
            setStore(val);
        },
        visible,
        setVisible: val => {
            setVisible(val);
        },
        mode: rest.mode || "vertical",
        multiple: Boolean(multiple),
        store1: []
    }}>
        <NavBars data={data} className={className} ref={ref} {...rest}/>
    </Context.Provider>;
};

export default Nav;