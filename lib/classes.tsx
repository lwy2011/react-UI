function scopeClassName(fix: string) {
    return function (name?: string, extra?: string | undefined) {
        const val = [fix, name].filter(Boolean).join("-");
        return extra ? [val, extra].filter(Boolean).join(" ") : val;
    };
}

export {scopeClassName};