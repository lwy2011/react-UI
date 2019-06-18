import * as React from "react";
import {scopeClassName} from "../../helpers/classes";
import {Fragment, useContext, useEffect, useState} from "react";
import {slidesContext} from "./slides.context";

// import {useEffect} from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    ID: string,
    delay: number,
    style: { [k: string]: string },
    animationType: string
}

const SlidesItem: React.FunctionComponent<Props> = ({className, children, ID, delay, style, animationType, ...rest}) => {
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
            current === ID ? setVisible("current") :
                getNext(current) === ID ? setVisible("next") : setVisible("");

        }, [current]
    );
    useEffect(
        () => {
            set("", undefined, true);
        }, []
    );
    return (
        visible || visible === "current" || visible === "next" ?
            <div className={sc("", className)}
                 style={{
                     ...style,
                     animation: ` slides-fade-${visible === "current" ? "out" : "in"} ${delay}s ${animationType}`
                 }}
                 {...rest} >
                {children}
            </div> : <Fragment/>
    );
};

export default SlidesItem;