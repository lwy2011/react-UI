const drawImg = (img: CanvasImageSource, width: number, height: number) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    //铺底色 PNG转JPEG时透明区域会变黑色
    context!.fillStyle = "#fff";
    context!.fillRect(0, 0, width, height);
    // @ts-ignore
    context.drawImage(img, 0, 0, width, height);
    return canvas;
};


const zipImg = (file: File | Blob, width: number, height: number, fn: (data: { [k: string]: string | Blob }, name?: string) => void, name: string, err?: () => void) => {
    const reader = new FileReader();
    const img = new Image();
    reader.onload = () => {
        const src = typeof reader.result === "string" ? reader.result : "";
        console.log(`原图${(src.length / 1024).toFixed(2)}kb`);
        img.src = src;
        img.onload = () => {
            const base64 = drawImg(img, width, height).toDataURL("image/jpeg", 0.95);
            console.log(`新图${(base64.length / 1024).toFixed(2)}kb`);
            //去掉url的头，并转换为byte
            const bytes = window.atob(base64.split(",")[1]);
            //处理异常,将ascii码小于0的转换为大于0
            const ab = new ArrayBuffer(bytes.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            const now = new Blob([ab], {type: "image/jpeg"});
            const src = window.URL.createObjectURL(now);

            fn({file: now, title: name, src: src, type: now.type, size: now.size + ""});
        };
        img.onerror = () => err && err();
    };
    reader.onerror = () => err && err();
    reader.readAsDataURL(file);
};


export default zipImg;