import React from "react";
import ReactDom from "react-dom";
import Icon from "./icon/icon";

const iconClick: React.MouseEventHandler = (e) => {
    console.log(e.target);
};
ReactDom.render(<div>
    <Icon name="alipay" onClick={iconClick}
          onMouseEnter={() => console.log("enter")}
          onMouseLeave={() => console.log("leave")}/>
    <Icon name="QQ"/>
    <Icon name="weixin"/>
</div>, document.getElementById("app"));

