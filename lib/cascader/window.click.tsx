import {useEffect} from "react";

const windowClick = (fn: () => void, box: HTMLElement | undefined | null, result: HTMLElement | undefined, visible: boolean) => {
    const callback = (e: MouseEvent) => {
        if (!box || !result) return;
        const {target} = e;
        const node = target && (target as HTMLElement);
        const test = node && box.contains(node);
        result.contains(node);
        !test && fn();
        (!test || node && (result.contains(node) || result === node)) &&
        document.removeEventListener("click", callback);
        console.log("chufale", test);
    };
    useEffect(
        () => {
            visible && document.addEventListener("click", callback);
        }, [visible]
    );
    return "";
};

export default windowClick;