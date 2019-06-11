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
    setVisible?: (val: boolean) => void
}

const sc = scopeClassName("yr-popover");

const PopoverDom: React.FunctionComponent<Props> = ({className, children, visible, close, setVisible, ...rest}) => {
    const Dom = useRef(document.createElement("div"));
    const dom = visible &&
        <div className={sc("", className)} {...rest} ref={Dom}>
            {children}
        </div>;
    const windowClick = (e: Event) => {
        const {current} = Dom;
        console.log(current);
        if (
            !(
                e.target && current &&
                current.contains(e.target as HTMLElement) ||
                current === e.target
            )
        ) {
            close();
            console.log("window ccc");
            setVisible && setVisible(false);
        }
    };
    useEffect(
        () => {
            console.log(Dom, "创建了，等待storage");
            // storage && storage(Dom.current);
            document.addEventListener(
                "click", windowClick
            );
            return () => {
                console.log("remove  ,,,,");
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
    // storage?: Storage,
    setVisible?: (val: boolean) => void
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
        <PopoverDom visible={true} style={style} close={close} setVisible={setVisible}>
            {content}
        </PopoverDom>;
    ReactDom.render(Component, div);

    return close;
};

interface trigger extends React.HTMLAttributes<HTMLDivElement> {
    content: ReactNode,
    clickCallback?: (visible: boolean) => void
}

const PopoverTrigger: React.FunctionComponent<trigger> =
    ({className, children, content, clickCallback, ...rest}) => {
        const [visible, setVisible] = useState(false);
        const [triggerStyle, setStyle] = useState<{ [k: string]: number }>({});
        // const [closeFn, setCloseFn] = useState<undefined | (() => void)>(undefined);
        const div = document.createElement("div");
        const trigger = useRef(div);
        const {left, top, bottom, right} = triggerStyle;
        const popStyle = left >= 0 && top >= 0 ?
            {
                left: left + window.scrollX + "px",
                top: top + window.scrollY + "px",
                transform: "translateY(-100%)"
            } : {left: "0"};
        console.log(bottom, right, left, top, popStyle, "111");

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

        const create = (style: styleType) => {
            Popover(
                content, style,
                // (data: HTMLDivElement | undefined) => {
                //     console.log(data, "sss");
                //     // setPopoverRef.current = data;
                // },
                (val: boolean) => {setVisible(val);}
            );
            // eventRef.current = (e: Event) => {windowClick(e);};
            // setCloseFn(() => close);
            // document.addEventListener(
            //     "click", windowClick
            // );
        };

        // const toClose = () => {
        //     // closeFn && closeFn();
        //     // setCloseFn(undefined);
        //     // setPopoverRef.current = undefined;
        // };
        const triggerClick = () => {
            visible && document.body.click();
            setVisible(!visible);
            clickCallback && clickCallback(visible);
        };
        useEffect(
            () => {
                const {left, top, bottom, right} = trigger.current.getBoundingClientRect();
                setStyle({left, top, bottom, right});
            }, []
        );
        useEffect(
            () => {
                // !visible && removeEvent();
                visible && create(popStyle);
            }, [visible]
        );
        useEffect(
            () => {
                close && visible && setVisible(false);
            }, [close]
        );
        return (
            <div
                className={sc("trigger", className)}
                ref={trigger} {...rest} onClick={triggerClick}>
                {children}
            </div>
        );
    };

export default PopoverTrigger;