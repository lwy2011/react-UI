let scrollbarWidth: () => number;
scrollbarWidth = () => {
    const div = document.createElement("textarea");
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.position = "absolute";
    div.style.top = div.style.left = "-9999px";  //不让用户看见
    div.style.overflow = "scroll";
    document.body.appendChild(div);

    const value = div.offsetWidth - div.clientWidth;   //IE浏览器的
    //Webkit的,直接用css设置为0 了。

    // console.log(value, div.getBoundingClientRect().width, div.clientWidth,);
    document.body.removeChild(div);
    return value;
};

export default scrollbarWidth;