import * as React from "react";
import Button from "./button";


const Buttons1: React.FunctionComponent = () => {
    return (
        <div className="buttons">
            <Button message='ok'/>
            <Button icon="left" style={{"padding": ".5em"}}/>
            <Button icon="right" style={{"padding": ".2em"}}/>
            <Button icon="close" state={{close: true}}/>
            <Button icon="close" state={{warning: true}}/>

        </div>
    );
};

export default Buttons1;