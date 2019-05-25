const classes = (...names: (string | undefined)[]): string =>
    names.filter(Boolean).join(" ");
export default classes;


interface classToggles {
    [k: string]: boolean
}

function scopeClassName(fix: string) {
    return function (name?: string | classToggles, extra?: string | undefined) {
        const nameArr = typeof name === "string" ? [name] :
            name && Object.entries(name).filter(val => val[1]).map(val => val[0]);

        const val = nameArr ?
            nameArr.reduce(
                (a, b) => a + (a ? " " : "") + [fix, b].filter(Boolean).join("-"), ""
            ) : fix;

        return extra ? [val, extra].filter(Boolean).join(" ") : val;
    };
}

export {scopeClassName};