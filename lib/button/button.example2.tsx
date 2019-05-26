import * as React from "react";
import Button from "./button";


const Buttons2: React.FunctionComponent = () => {
    return (
        <div className="buttons">
            <Button message="向下" icon='down' iconMargin=".3em"/>
            <Button message="向下" icon='down' right={true}/>
        </div>
    );
};
export default Buttons2;