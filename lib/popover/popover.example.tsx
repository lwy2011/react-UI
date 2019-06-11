import * as React from "react";
import PopoverTrigger from "./popover";
import Icon from "../icon/icon";
import Button from "../button/button";
import "./popover.example.scss";

const PopoverExample: React.FunctionComponent = () => {
    const triggerClick = (visible: boolean) => {
        console.log(visible);
    };
    return (
        <div className="yr-popover-example" style={{overflow: "hidden"}}>
            <PopoverTrigger
                clickCallback={triggerClick}
                content={
                    <div>
                        <h4>
                            {"what a u 弄啥嘞？？"} <Icon name={"guilian3"}/>
                        </h4>
                        <Button message={"ok"} onClick={() => document.body.click()}/>
                    </div>
                }
            >
                <Button icon={"women"}/>
            </PopoverTrigger>
            <PopoverTrigger
                clickCallback={triggerClick}
                content={
                    <div>
                        <h4>
                            {"what a u 弄啥嘞？？"} <Icon name={"guilian3"}/>
                        </h4>
                        <Button message={"ok"} onClick={() => document.body.click()}/>
                    </div>
                }
            >
                <Button icon={"user"} style={{margin: "1em 0"}}/>
            </PopoverTrigger>
        </div>
    );
};

export default PopoverExample;