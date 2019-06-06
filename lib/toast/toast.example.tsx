import Button from "../button/button";
import Toast from "./toast";
import * as React from "react";


const ToastExample: React.FunctionComponent = () => {
    const showToast = (message: string) => Toast(message);
    return (
        <div className="yr-toast-example">
            <Button message={"点我"} onClick={() => showToast("点我干哈？")}/>
        </div>
    );
};
export default ToastExample;