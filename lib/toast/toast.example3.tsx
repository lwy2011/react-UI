import Button from "../button/button";
import {OnlyOneToast} from "./toast";
import * as React from "react";
import "./toast.example.scss";
import {useState} from "react";


const ToastExample3: React.FunctionComponent = () => {

    const [count, setCount] = useState(0);
    const closeCallback = () => {
        console.log("closed");
        setCount(count + 1);
    };
    const buttonClick = (e: React.MouseEvent) => {
        count > 5 && e.stopPropagation();
        count > 5 && alert("我拦截toast了，因为count > 5 了");
    };
    return (
        <div className="yr-toast-example">
            <h4>{"点击之后，旧的消除，新的创建！button不加disabled,不依赖关闭的延迟时间！"}</h4>
            <h4 style={{color: "red", fontSize: "12px", textAlign: "left"}}>
                {
                    `onlyOneToast包裹的button点击，button点击触发判断条件，符合toast的，就不阻止冒泡。
                    这时候，最好在onlyOneToast容器的样式上，让它尽量不被点击到，不要内边距.如果没有这个拦截的需求，就
                    简单多了，不拦截内部元素的事件冒泡就可以的。
                    `
                }
            </h4>

            <h4>{"封装的初步的API"}</h4>
            <h4>{"测试一"}</h4>
            <OnlyOneToast config={
                {
                    child: <div>
                        <h4>{"点我干哈？我定10s后消失,点击关闭，可提前关闭！"}</h4>
                        <p style={{color: "red"}}>
                            {`每点击一次，旧的消失，新的生成！看`}
                            <span style={{color: "blue"}}>
                                {parseInt(Math.random() * 100 + "")}
                            </span>
                        </p>
                        <Button message={"吻我！"} icon={"guilian2"}
                                onClick={() => alert("你问我爱你有多深？给钱！")}/>
                    </div>,
                    autoCloseDelay: 10,
                    closeText: "关闭",
                    closeCallback: closeCallback,
                }
            } style={{display: "inline-flex"}}>
                <Button onClick={buttonClick}
                        message={`点我,我定10s后消失,可点关闭，提前关闭,点一次，旧的没了，新的出来`}/>
            </OnlyOneToast>
            <p>{"关闭后，count自增："}{count}</p>
        </div>
    );
};
export default ToastExample3;