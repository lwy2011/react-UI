import React, {FunctionComponent} from "react";

import Icon from "./icon";

const example: FunctionComponent = () => <div>
    <Icon name="alipay"/>
    <Icon name="QQ"/>
    <Icon name="weixin" style={{"fill": "#Feac45"}}/>
</div>;

export default example;