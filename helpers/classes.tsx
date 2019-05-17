const classes = (...names: (string | undefined)[]): string =>
    names.filter(Boolean).join(" ");
export default classes;