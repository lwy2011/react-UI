declare module "*.svg" {
    const content: any;
    export default content;    //设置import ** from '**/**/*.svg'的时候，导出的值，否则导出没值，报错
}


declare module "*.png" {
    const content: any;
    export default content;    //设置import ** from '**/**/*.svg'的时候，导出的值，否则导出没值，报错
}
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.gif"
declare module "*.bmp"
declare module "*.tiff"