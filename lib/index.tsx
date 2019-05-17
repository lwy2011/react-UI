import React from "react";
import ReactDom from "react-dom";
import Icon from "./icon";

ReactDom.render(<div>
    <Icon name="alipay"/>
    <Icon name="QQ"/>
    <Icon name="weixin"/>
</div>, document.getElementById("app"));

