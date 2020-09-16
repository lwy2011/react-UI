import React, {HTMLAttributes, useContext} from "react";
import {Context, Item} from "./nav";
import classes, {scopeClassName} from "../../helpers/classes";

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: Item,
    level: number,
}

const sc = scopeClassName("yr-nav-item");
const NavItem = ({
                     className, level,
                     data, ...rest
                 }: Props) => {
    const {name, slotFn} = data;
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
        <div onClick={set} className={classes(sc("name"), active())}>
            {
                slotFn ? slotFn() :
                    name
            }
        </div>
    </div>;
};

export default NavItem;