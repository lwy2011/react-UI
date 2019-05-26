import React, {FunctionComponent} from "react";

import Icon from "./icon";

const Iconexample: FunctionComponent = () => <div>
        <Icon name="alipay"/>
        <Icon name="QQ"/>
        <Icon name="weixin" style={{"color": "#Feac45"}}/>
</div>;

export default Iconexample;