import React, {HTMLAttributes, useContext} from "react";
import {Context, Item} from "./nav";
import classes, {scopeClassName} from "../../helpers/classes";
import NavItem from "./nav-item";

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: Item,
    level: number,
}

const sc = scopeClassName("yr-nav-sub");
const SubNav = ({
                    className, level, children,
                    data, ...rest
                }: Props) => {
    const {sub, name, slotFn} = data;
    const {store, setStore} = useContext(Context);
    const set = () => {
        const arr = store.slice(0, level);
        arr.push(name);
        setStore(arr);
    };
    const active = () =>
        store[level] === name ? "active" : "";
    return <div {...rest}
                className={classes(className, sc())}
    >
        <div className={classes(sc("text"), active())} onClick={set}>
            {
                slotFn ? slotFn() :
                    name
            }
        </div>
        {
            sub && <div className={classes(sc("popover"), active())}>
                {
                    sub.map(
                        item => item.sub ?
                            <SubNav data={item} key={item.name} level={level + 1}/> :
                            <NavItem key={item.name} data={item} level={level + 1}/>
                    )
                }
            </div>
        }
    </div>;
};

export default SubNav;