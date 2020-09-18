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
    const {store, setStore, setVisible} = useContext(Context);
    const set = () => {
        const arr = store.slice(0, level);
        arr.push(name);
        setStore(arr);
        setVisible(false);
    };
    const active = () =>
        store[level] === name ? "active" : "";

    return <div {...rest} className={classes(className, sc())}>
        <div onClick={set} className={classes(sc("name"), active())}>
            {
                slotFn ? slotFn(false) :
                    name
            }
        </div>
    </div>;
};

export default NavItem;