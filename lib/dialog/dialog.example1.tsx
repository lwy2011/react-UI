import {alert, confirm, modal} from "./dialog";
import * as React from "react";
import Button from "../button/button";


const Dialogs1: React.FunctionComponent = () => {

    const openModal = () => {
        const modalClose =
            modal(<h3>"你好！"<Button message="close" onClick={() => modalClose()}/></h3>);
    };
    return (
        <div className="dialogs">
            <h4>{"变种"}</h4>
            <Button message="alert" onClick={() => alert("alert")}/>
            <Button message="modal"
                    onClick={openModal}/>
            <Button message="confirm"
                    onClick={
                        () =>
                            confirm(
                                "confirm",
                                () => {alert("what are u 弄啥嘞 ？？");},
                                () => {console.log("no");})}/>


        </div>
    );
};
export default Dialogs1;