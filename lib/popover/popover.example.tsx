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
                position={"top"}
                content={
                    <div>
                        <h4>
                            {"what a u 弄啥嘞？？"} <Icon name={"guilian"}/>
                        </h4>
                        <Button message={"ok"} onClick={() => document.body.click()}/>
                    </div>
                }
            >
                <Button icon={"women"}/>
            </PopoverTrigger>
            <PopoverTrigger
                clickCallback={triggerClick}
                style={{margin: "1em"}}
                position={"left"}
                content={
                    <div>
                        <h4>
                            {"what a u 弄啥嘞？？"} <Icon name={"guilian2"}/>
                        </h4>
                        <Button message={"ok"} onClick={() => document.body.click()}/>
                    </div>
                }
            >
                <Button icon={"user"}/>
            </PopoverTrigger>
            <PopoverTrigger
                clickCallback={triggerClick}
                style={{margin: "1em"}}
                position={"bottom"}
                content={
                    <div>
                        <h4>
                            {"what a u 弄啥嘞？？"} <Icon name={"guilian2"}/>
                        </h4>
                        <Button message={"ok"} onClick={() => document.body.click()}/>
                    </div>
                }
            >
                <Button icon={"user"}/>
            </PopoverTrigger>
            <PopoverTrigger
                clickCallback={triggerClick}
                style={{margin: "1em"}}
                position={"right"}
                content={
                    <div>
                        <h4>
                            {"what a u 弄啥嘞？？"} <Icon name={"guilian2"}/>
                        </h4>
                        <Button message={"ok"} onClick={() => document.body.click()}/>
                    </div>
                }
            >
                <Button icon={"user"}/>
            </PopoverTrigger>
        </div>
    );
};

export default PopoverExample;