function scopeClassName(fix: string) {
    return function (name?: string) {
        return [fix, name].filter(Boolean).join("-");
    };
}

export {scopeClassName};