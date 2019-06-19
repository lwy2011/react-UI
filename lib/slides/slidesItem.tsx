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
    const {current, ids, lock, set} = useContext(slidesContext);
    const getNext = (current: string) => {
        const index = ids.indexOf(current);
        return index < ids.length - 1 ? ids[index + 1] : ids[0];
    };
    const [visible, setVisible] = useState("chushihua");

    useEffect(
        () => {
            if (!lock) return;
            current === ID && setVisible("current");
            getNext(current) === ID && setVisible("next");
            current === ID && setTimeout(
                () => setVisible("last"), delay * 1000
            );

        }, [current]
    );
    useEffect(
        () => {
            visible === "last" && setTimeout(
                () => setVisible(""), (animationDelay < delay && animationDelay || delay - 1) * 1000
            );
        }, [visible]
    );
    useEffect(
        () => {

            set("", undefined, true);
        }, []
    );
    return (
        visible ?
            <div className={sc("", className)}
                 style={{
                     ...style,
                     display: visible === "next" ? "none" : "block",
                     position: visible === "current" ? "relative" : "absolute",
                     animation: ` slides-fade-${visible === "current" ? "in" : "out"} ${(animationDelay < delay && animationDelay || delay - 1)}s ${animationType}`
                 }}
                 {...rest} >
                {children}
            </div> : <Fragment/>
    );
};

export default SlidesItem;