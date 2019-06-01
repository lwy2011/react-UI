import Dialog from "./dialog";
import * as React from "react";
import {useState} from "react";
import Button from "../button/button";

const type1 = require("../../imgs/dialog1.png");
const type2 = require("../../imgs/dialog2.png");
const type3 = require("../../imgs/dialog3.png");
const type4 = require("../../imgs/dialog4.png");


const Dialogs: React.FunctionComponent = () => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const buttonClick = (type: string, index: number) => {
        index === 1 && setShow(false);
        index === 2 && setShow1(false);
        index === 3 && setShow2(false);

        console.log(type, index);
    };
    return (
        <div className="dialogs">
            <ul>
                <li>
                    <h4>{"原型1"}</h4>
                    <img src={type1} alt="img"/>
                    <Dialog visible={show}
                            title="提示"
                            close={() => setShow(false)}
                            buttons={
                                [
                                    <Button message="ok" onClick={() => buttonClick("ok", 1)}/>,
                                    <Button message="cancel" onClick={() => buttonClick("cancel", 1)}/>
                                ]
                            }>
                        <p>"对话框"</p>
                    </Dialog>

                    <Button message="dialog1" onClick={() => setShow(!show)}/>
                </li>
                <li>
                    <h4>{"原型2"}</h4>

                    <img src={type2} alt="img"/>

                    <Dialog visible={show1}
                            title="提示"
                            maskClickToClose={true}
                            close={() => setShow1(false)}
                            buttons={
                                [
                                    <Button message="ok" onClick={() => buttonClick("ok", 2)}/>,
                                    <Button message="cancel" onClick={() => buttonClick("cancel", 2)}/>
                                ]
                            }>
                        <p>"对话框1"</p>
                    </Dialog>
                    <Button message="dialog2" onClick={() => setShow1(!show1)}/>
                </li>
                <li>

                    <h4>{"原型3"}</h4>

                    <img src={type3} alt="img"/>
                    <Dialog visible={show2}
                            close={() => setShow2(false)}
                            buttons={
                                [
                                    <Button message="ok" onClick={() => buttonClick("ok", 3)}/>,
                                    <Button message="cancel" onClick={() => buttonClick("cancel", 3)}/>
                                ]
                            }>
                        <p>"对话框"</p>
                    </Dialog>
                    <Button message="dialog3" onClick={() => setShow2(!show2)}/>
                </li>
                <li>
                    <h4>{"原型4"}</h4>

                    <img src={type4} alt="img"/>
                    <Dialog visible={show3}
                            close={() => setShow3(false)}>
                        <p>"对话框"</p>
                    </Dialog>
                    <Button message="dialog4" onClick={() => setShow3(!show3)}/>
                </li>
            </ul>












        </div>
    );
};
export default Dialogs;