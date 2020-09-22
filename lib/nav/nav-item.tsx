import React, {HTMLAttributes, useContext} from "react";
import {Context, Item} from "./nav";
import classes, {scopeClassName} from "../../helpers/classes";

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: Item,
    level: number,
    last: string
}

const sc = scopeClassName("yr-nav-item");
const NavItem = ({
                     className, level, last,
                     data, ...rest
                 }: Props) => {
    const {name, slotFn, disabled} = data;
    const {store, setStore, setVisible, mode, multiple} = useContext(Context);
    const singleSet = () => {
        const arr = store.slice(0, level);
        arr.push(name);
        setStore(arr);
        mode === "vertical" && setVisible(false);
    };
    const set = () => {
        if (disabled) return;
        if (multiple) {

        } else {
            singleSet();
        }
    };
    const active = () =>
        store[level] === name ? "active" : "";
    const style = mode === "horizontal" ? {textIndent: level * 8 + "px"} : {};
    return <div {...rest} className={classes(className, sc())}>
        <div onClick={set} style={style}
             className={classes(sc("name"), active(), disabled ? "disabled" : "")}>
            {
                slotFn ? slotFn(false) :
                    name
            }
        </div>
    </div>;
};

export default NavItem;