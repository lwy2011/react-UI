import React, {HTMLAttributes, useContext} from "react";
import {Context, Item} from "./nav";
import classes, {scopeClassName} from "../../helpers/classes";

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: Item,
    level: number,
    slotFn?: (text: string) => React.FunctionComponent
}

const sc = scopeClassName("yr-nav-item");
const NavItem = ({
                     slotFn,
                     className, level,
                     data, ...rest
                 }: Props) => {
    const {name} = data;
    const {store, setStore} = useContext(Context);
    const set = () => {
        const arr = store.slice(0, level);
        console.log(arr, name);
        arr.push(name);
        console.log(arr, name);

        setStore(arr);
    };
    const active = () =>
        store[level] === name ? "active" : "";

    return <div {...rest} className={classes(className, sc())}>
        <p onClick={set} className={classes(sc("name"), active())}>
            {
                slotFn ? slotFn(name) :
                    name
            }
        </p>
    </div>;
};

export default NavItem;