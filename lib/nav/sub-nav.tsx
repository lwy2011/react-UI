import React, {HTMLAttributes, RefObject, useContext, useEffect, useRef, useState} from "react";
import {Context, Item} from "./nav";
import classes, {scopeClassName} from "../../helpers/classes";
import NavItem from "./nav-item";

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: Item,
    level: number,
    last?: string
}

const sc = scopeClassName("yr-nav-sub");

interface Props1 {
    sub: Item[],
    level: number,
    last: string,
    visible?: boolean,
    active?: string,
}

const Content = (
    {sub, level, last}: Props1,
    ref: RefObject<HTMLDivElement>) =>
    <div className={sc("popover-content", "fade-in1")} ref={ref}>
        {
            sub.map(
                item => item.sub ?
                    <SubNav data={item} key={item.name} level={level + 1} last={last}/> :
                    <NavItem key={item.name} data={item} level={level + 1} last={last}/>
            )
        }
    </div>;

const Content1 = React.forwardRef(Content);

const Popover = ({
                     last,
                     visible,
                     sub,
                     level,
                     active
                 }: Props1) => {
    const ref = useRef(document.body as HTMLDivElement);
    const fadeIn = (dom: HTMLDivElement, height: number) => {
        dom.classList.add("fade-in2");
        dom.animate(
            [
                {height: 0, overflow: "hidden"},
                {height: height + "px", overflow: "hidden"}
            ], 300
        );
        dom.classList.remove("fade-in2", "fade-in1");
    };
    const fadeOut = (dom: HTMLDivElement, height: number) => {
        dom.animate(
            [
                {height: height + "px", overflow: "hidden"},
                {height: 0, overflow: "hidden"}
            ], 200
        );
    };
    useEffect(
        () => {
            const dom = ref.current;  //初始化时为默认值，需要等下一次宏任务时拿到
            setTimeout(
                () => {
                    const {height} = dom.getBoundingClientRect();
                    fadeIn(dom, height);
                }
            );
        }, []
    );
    useEffect(
        () => {
            if (!active || !visible) {
                const dom = ref.current;
                const {height} = dom.getBoundingClientRect();
                fadeOut(dom, height);
            }
        }, [active, visible]
    );
    return <div className={classes(sc("popover"))}>
        <Content1 level={level} sub={sub} ref={ref} last={last}/>
    </div>;
};

const SubNav = ({
                    last, className, level, children,
                    data, ...rest
                }: Props) => {
    const {sub, name, slotFn, disabled} = data;
    const {store, setStore, visible, setVisible, mode, multiple, store1} = useContext(Context);
    const [destroy, setDestroy] = useState(true); //延迟销毁，为了销毁动画！
    const [show, setShow] = useState(false);
    const active =
        store[level] === name ? "active" : "";
    const singleSet = () => {
        if (store[level] !== name) {
            const arr = store.slice(0, level);
            arr.push(name);
            setStore(arr);
        }
    };
    const multipleSet = () => {
        const copy = [...store1];
        const obj = copy[level] || {};    //{[name]:last}形式
        if (!obj[name]) {
            obj[name] = last || "";
        }
        copy[level] = obj;
    };
    const set = () => {
        if (disabled) return;
        setVisible(true);
        setShow(!show);
        if (multiple) {
            multipleSet();
        } else {
            singleSet();
        }
    };
    const style = mode === "horizontal" ? {textIndent: level * 8 + "px"} : {};

    useEffect(
        () => {
            if (!active) {
                setShow(false);
            }
        }, [active]
    );
    useEffect(
        () => {
            if (show) {
                setDestroy(false);
            } else {
                !destroy && setTimeout(   //这里是个坑！
                    () => {
                        setDestroy(true);
                    }, 200
                );
            }
        }, [show]
    );
    useEffect(
        () => {
            if (!visible && show) {
                setShow(false);
            }
        }, [visible]
    );
    useEffect(
        () => {
            if (active) {
                setShow(true);
            }
        }, []
    );
    return <div {...rest}
                className={classes(className, sc())}
    >
        <div className={classes(sc("text"), active, disabled ? "disabled" : "")}
             style={style}
             onClick={set}>
            {
                slotFn ? slotFn(show) :
                    name
            }
        </div>
        {
            sub && !destroy &&
            <Popover level={level}
                     sub={sub}
                     active={active}
                     last={name}
                     visible={show}/>
        }
    </div>;
};

export default SubNav;