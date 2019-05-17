declare module "*.svg" {
    const content: any;
    export default content;    //设置import ** from '**/**/*.svg'的时候，导出的值，否则导出没值，报错
}