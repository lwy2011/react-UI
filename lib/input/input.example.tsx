import * as React from "react";
import Input, {IconInput} from "./input";
import {useState} from "react";


const InputExample: React.FunctionComponent = () => {
    const [data, setData] =
        useState<{ [k: string]: any }>({user: "yong", password: ""});
    const [message, setMsg] = useState("");
    const iconClick = (e: React.MouseEvent, name: string) => {
        console.log(e.target, name);
        name === "close" && setMsg("");
    };
    return (
        <div>
            <Input/>
            <div>
                {JSON.stringify(data)}
            </div>
            <div>
                message : {message}
            </div>
            <IconInput type="text"
                       onChange={e => setData({...data, user: e.target.value})}
                       value={data.user}
                       icon={
                           [
                               {name: "user", left: true}
                           ]
                       }/>
            <IconInput type="password"
                       value={data.password}
                       onChange={e => setData({...data, password: e.target.value})}
                       icon={
                           [
                               {name: "password", left: true},
                               {name: "key", left: false}
                           ]
                       }/>
            <IconInput type="text"
                       value={message}
                       onChange={e => setMsg(e.target.value)}
                       iconClick={iconClick}
                       onBlur={() => setMsg(message + "输入完毕!可以检验！")}
                       icon={
                           [
                               {name: "close", left: false, style: {"color": "#FF4D4F"}}
                           ]
                       }/>
        </div>
    );
};


export default InputExample;