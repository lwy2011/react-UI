import Dialog, {alert, confirm, modal} from "./dialog";
import * as React from "react";
import {useState} from "react";
import Button from "../button/button";


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
    const openModal = () => {
        const modalClose = modal(<h3>"你好！"<Button message="close" onClick={() => modalClose()}/></h3>);
    };
    return (
        <div className="dialogs">
            <Button message="dialog1" onClick={() => setShow(!show)}/>
            <Button message="dialog2" onClick={() => setShow1(!show1)}/>
            <Button message="dialog3" onClick={() => setShow2(!show2)}/>
            <Button message="dialog4" onClick={() => setShow3(!show3)}/>
            <Button message="alert" onClick={() => alert("alert")}/>
            <Button message="modal"
                    onClick={openModal}/>
            <Button message="confirm"
                    onClick={
                        () =>
                            confirm("confirm", () => {setShow(!show);}, () => {console.log("no");})}/>

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
            <Dialog visible={show3}
                    close={() => setShow3(false)}>
                <p>"对话框"</p>
            </Dialog>
        </div>
    );
};
export default Dialogs;