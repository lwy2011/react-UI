import * as React from "react";
import {scopeClassName} from "../../helpers/classes";
import {Fragment, useContext, useEffect, useState} from "react";
import {slidesContext} from "./slides.context";

// import {useEffect} from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    ID: string,
    delay: number,
    style: { [k: string]: string },
    animationType: string,
    animationDelay: number
}

const SlidesItem: React.FunctionComponent<Props> = ({className, children, ID, delay, style, animationType, animationDelay, ...rest}) => {
    const sc = scopeClassName("yr-slides-item");
    const {current, ids, set} = useContext(slidesContext);
    const getNext = (current: string) => {
        const index = ids.indexOf(current);
        return index < ids.length - 1 ? ids[index + 1] : ids[0];
    };
    const [visible, setVisible] = useState("");

    useEffect(
        () => {
            current === ID && setVisible("current");
            const next = getNext(current);
            current !== ID && setVisible("");
            if (next) {
                next === ID && setVisible("next");
                next === ID && setTimeout(
                    () => {setVisible("nextToCurrent");}, (delay - animationDelay) * 1000
                );
                current === ID && setTimeout(
                    () => {
                        setVisible("last");
                    }, (delay - animationDelay) * 1000
                );
            }
            console.log(visible, "vvvv", current, 666);
        }, [current]
    );
    useEffect(
        () => {
            visible === "last" && setTimeout(
                () => setVisible(""), animationDelay * 1000
            );
        }, [visible]
    );
    useEffect(
        () => {
            set("", undefined, true);
        }, []
    );
    const classTest = (str: string) => visible === str;

    return (
        visible ?
            <div className={sc({
                "": true,
                last: classTest("last"),
                next: classTest("next"),
                current: classTest("current"),
                nextToCurrent: classTest("nextToCurrent")
            }, className)}
                 style={{
                     ...style,
                     animation: ` slides-fade-${visible === "nextToCurrent" ? "in" : visible === "last" && "out"} 
                     ${animationDelay}s ${animationType}`
                 }}
                 {...rest} >
                {children}
            </div> : <Fragment/>
    );
};

export default SlidesItem;