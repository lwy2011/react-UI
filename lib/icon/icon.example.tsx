import React, {FunctionComponent} from "react";

import Icon from "./icon";

const IconExample: FunctionComponent = () => <div>
        <Icon name="alipay"/>
        <Icon name="QQ"/>
        <Icon name="weixin" style={{"color": "#Feac45"}}/>
        <Icon name="loading" className="yr-icon-loading"/>
        <Icon name="search" className="yr-icon-move"/>
        <Icon name=""/>
</div>;

export default IconExample;