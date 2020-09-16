import React, {HTMLAttributes, useContext} from "react";
import {Context, Item} from "./nav";
import classes, {scopeClassName} from "../../helpers/classes";
import NavItem from "./nav-item";

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: Item,
    level: number,
    slotFn?: (text: string) => React.FunctionComponent
}

const sc = scopeClassName("yr-nav-sub");
const SubNav = ({
                    className, level, children,
                    slotFn, data, ...rest
                }: Props) => {
    const {sub, name} = data;
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
        <p className={classes(sc("text"), active())} onClick={set}>
            {
                slotFn ? slotFn(name) :
                    name
            }
        </p>
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