import React, {HTMLAttributes, ReactNode, useState} from "react";
import classes from "../../helpers/classes";
import "./nav.scss";
import SubNav from "./sub-nav";

export interface Item {
    name: string,
    sub?: Item[],
    slotFn?: () => ReactNode
    [propName: string]: any
}

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: Item[]
}

export const Context = React.createContext(
    {
        store: ["3"], setStore: (val: string[]) => {
        }
    }
);
const Nav = ({
                 className,
                 data, ...rest
             }: Props) => {
    const [store, setStore] = useState<string[]>([]);
    return <div className={classes(className, "yr-nav")} {...rest}>
        <Context.Provider value={{
            store, setStore: (val) => {
                setStore(val);
            }
        }}>
            {
                data.map(
                    item => <SubNav key={item.name} data={item} level={0}/>
                )
            }
        </Context.Provider>
    </div>;
};

export default Nav;