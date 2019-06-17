const windowClick = (fn: () => void, dom: HTMLElement, result: HTMLElement) => {
    const callback = (e: MouseEvent) => {
        const {target} = e;
        const node = target && (target as HTMLElement);
        const test = node && dom.contains(node);
        result.contains(node);
        !test && fn();
        (!test || node && (result.contains(node) || result === node)) &&
        document.removeEventListener("click", callback);
        console.log("chufale", test);
    };
    return {
        create: () => document.addEventListener("click", callback),
        destroy: () => document.removeEventListener("click", callback)
    };
};

export default windowClick;