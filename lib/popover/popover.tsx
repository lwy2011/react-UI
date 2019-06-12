import {scopeClassName} from "../../helpers/classes";
import * as React from "react";
import {ReactNode, useEffect, useRef, useState} from "react";
import "./popover.scss";
import ReactDom from "react-dom";

// type Storage = (data: HTMLDivElement | undefined) => void;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean,
    // storage?: Storage,
    close: () => void,
    closeEvent: string,
    setVisible?: (val: boolean) => void
}

const sc = scopeClassName("yr-popover");

const PopoverDom: React.FunctionComponent<Props> =
    ({className, children, visible, close, setVisible, closeEvent, ...rest}) => {
        const Dom = useRef(document.createElement("div"));
        const dom = visible &&
            <div className={sc("", className)} {...rest} ref={Dom}>
                {children}
            </div>;
        const closeFn = () => {
            close();
            console.log("window ccc");
            setVisible && setVisible(false);
        };
        const windowClick = (e: Event) => {
            const {current} = Dom;
            if (
                e.target && (e.target as HTMLElement).classList
                    .contains("yr-popover-close-cli-true")
            ) {
                return closeFn();
            }
            if (e.target && current && current.contains(e.target as HTMLElement)) {
                const node = current.querySelector(".yr-popover-close-cli-true");
                const test = node && node.contains(e.target as HTMLElement);
                test && closeFn();
            } else {
                current !== e.target && closeFn();
            }
        };
        useEffect(
            () => {
                console.log("创建了，等待storage");
                // storage && storage(Dom.current);
                closeEvent === "click" &&
                document.addEventListener(
                    "click", windowClick
                );
                return () => {
                    console.log("remove  ,,,,");
                    closeEvent === "click" &&
                    document.removeEventListener(
                        "click", windowClick
                    );
                };
            }, []
        );
        return ReactDom.createPortal(dom, document.body);
    };

interface styleType {
    [k: string]: string | undefined
}

const Popover = (
    content: ReactNode,
    style: styleType,
    closeEvent: string,
    position: string,
    // storage?: Storage,
    setVisible?: (val: boolean) => void,
) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const close = () => {
        ReactDom.render(
            React.cloneElement(Component, {visible: false}), div
        );
        console.log("guanbile");
        ReactDom.unmountComponentAtNode(div);
        div.remove();
    };
    const Component =
        <PopoverDom visible={true} closeEvent={closeEvent}
                    className={`position-${position}`}
                    style={style} close={close} setVisible={setVisible}>
            {content}
        </PopoverDom>;
    ReactDom.render(Component, div);

    return close;
};

interface trigger extends React.HTMLAttributes<HTMLDivElement> {
    content: ReactNode,
    clickCallback?: (visible: boolean) => void,
    position: string,
    closeEvent: string
}

const PopoverTrigger: React.FunctionComponent<trigger> =
    ({className, children, content, clickCallback, position, closeEvent, ...rest}) => {
        const [visible, setVisible] = useState(false);
        const div = document.createElement("div");
        const trigger = useRef(div);
        const {current} = trigger;

        const getStyle = (current: HTMLElement) => {
            const {left, top, width, height} = current.getBoundingClientRect();
            const translateY = `calc(${height / 2}px - 50%)`;
            // console.log(left, top, "style");
            const transform = {
                left: {transform: `translate(-100%, ${translateY} )`},
                right: {transform: `translateX(calc(${width}px + .5em)) translateY(${translateY})`},
                bottom: {transform: `translateY(calc(${height}px + .5em)`}
            };
            // @ts-ignore
            const val = (position in transform) && transform[position];
            return left >= 0 && top >= 0 && width >= 0 && height >= 0 ?
                (
                    {
                        left: left + window.scrollX + "px",
                        top: top + window.scrollY + "px",
                        ...(val)
                    }
                )
                : {left: "0"};
        };

        const [closeFn, setFn] =
            useState<{ [k: string]: (() => void) | undefined }>({close: undefined});


        const create = (style: styleType) =>
            Popover(
                content, style, closeEvent, position,
                (val: boolean) => {setVisible(val);},
            );


        const triggerClick = () => {
            closeEvent === "click" && setVisible(!visible);
            clickCallback && clickCallback(!visible);
        };

        useEffect(
            () => {
                visible && create(getStyle(current));
            }, [visible]
        );

        const mouseenterCallback = (e: React.MouseEvent) => {
            if (closeEvent === "hover" && !closeFn.close) {
                const close = e.target && create(getStyle(e.target as HTMLElement));
                // console.log("hovering", close);
                setFn({
                    close: () => {
                        console.log(close, "close storage");
                        close();
                    }
                });
            }
        };
        const mouseleaveCallback = () => {
            if (closeEvent === "hover" && closeFn.close) {
                closeFn.close();
                setFn({close: undefined});
            }
            // console.log("hoverover", closeFn);
        };

        return (
            <div
                onMouseLeave={mouseleaveCallback}
                onMouseEnter={mouseenterCallback}
                className={sc("trigger", className)}
                ref={trigger} {...rest} onClick={triggerClick}>
                {children}
            </div>
        );
    }
;

export default PopoverTrigger;

// (data: HTMLDivElement | undefined) => {
//     console.log(data, "sss");
//     // setPopoverRef.current = data;
// },
// eventRef.current = (e: Event) => {windowClick(e);};
// setCloseFn(() => close);
// document.addEventListener(
//     "click", windowClick
// );

// const {left, top, bottom, right} = triggerStyle;
// const popStyle = left >= 0 && top >= 0 ?
//     {
//         left: left + window.scrollX + "px",
//         top: top + window.scrollY + "px",
//         transform: "translateY(-100%)"
//     } : {left: "0"};
// console.log(bottom, right, left, top, popStyle, "111");

// const windowClick = (e: Event) => {
//     const {current} = setPopoverRef;
//     console.log(current, "eventhui");
//     if (
//         !(
//             e.target && current &&
//             current.contains(e.target as HTMLElement) ||
//             current === e.target
//         )
//     ) {
//         // removeEvent();
//         setVisible(false);
//     }
//
// };

// const eventRef = useRef((e: Event) => {});

// const removeEvent = () => {
//     document.removeEventListener(
//         "click", eventRef.current
//     );
//     console.log("remove");
// };

// const setPopoverRef = useRef<HTMLDivElement | undefined>(div);

// const toClose = () => {
//     // closeFn && closeFn();
//     // setCloseFn(undefined);
//     // setPopoverRef.current = undefined;
// };