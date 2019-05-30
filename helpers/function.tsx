const getNode = (name: string) => document.querySelector(name);
const getNodes = (name: string) => document.querySelectorAll(name);
const getStyle = (name: string, type: string) => {
    const node = getNode(name);
    return node && window.getComputedStyle(node, null).getPropertyValue(type);
};


export {getStyle, getNode, getNodes};