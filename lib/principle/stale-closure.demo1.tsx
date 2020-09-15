() => {
};
const increament = () => {
    let val = 0;
    return () => {
        val++;
        console.log(val, "自增了！");
        const message = `val = ${val}`;
        return () => {
            console.log(message);
        };
    };
};
const fn = () => {
    console.log("fn 执行！");
    const c = increament();  //c函数
    const x = c();  //x是c第一次执行后返回的函数
    x();
    c();   //c再次执行，其实返回了x的更新款了！
    x();  //还是老款
    c();  //又生成了x的第三版了
    x();
};

const fn1 = () => {
    console.log("fn1 执行：");
    const c = increament();
    const x = c();
    x();
    const x1 = c();
    x1();
    const x2 = c();
    x2();
};
const increament1 = () => {
    let val = 0;
    return () => {
        val++;
        console.log(val, "自增了！");
        return () => {
            const message = `val = ${val}`;
            console.log(message);
        };
    };
};
const fn2 = () => {
    console.log("fn2 执行！");
    const c = increament1();  //c函数
    const x = c();  //x是c第一次执行后返回的函数
    x();
    c();   //c再次执行，其实返回了x的更新款了！
    x();  //还是老款
    c();  //又生成了x的第三版了
    x();
};
export {fn1, fn2};
export default fn;