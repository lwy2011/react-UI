import * as React from "react";
import Input, {IconInput} from "./input";
import {useState} from "react";
import Button from "../button/button";


const InputExample: React.FunctionComponent = () => {
    const [data, setData] =
        useState<{ [k: string]: any }>({user: "yong", password: "", search: ""});
    const [message, setMsg] = useState("");
    const iconClick = (e: React.MouseEvent, name: string) => {
        console.log(e.target, name);
        name === "close" && setMsg("");
    };
    const [value, setVal] = useState("看我！disabled");
    const [value1, setVal1] = useState("看我！我可以的");
    const [value2, setVal2] = useState("看我！只读哦");

    return (
        <div>
            <Input value={value} disabled onChange={e => setVal(e.target.value)}/>
            <Input value={value1} onChange={e => setVal1(e.target.value)}/>
            <Input value={value2} readOnly onChange={e => setVal2(e.target.value)}/>
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
                       onBlur={() => setMsg(message + "输入完毕!可以检验！")}
                       icon={
                           [
                               {name: "close", left: false, style: {"color": "#FF4D4F"}, click: iconClick}
                           ]
                       }/>
            <IconInput type="text"
                       placeholder={"请输入关键字"}
                       defaultValue={""}
                       onBlur={e => setData({...data, search: e.target.value})}
                       icon={
                           [
                               {name: "search", left: false}
                           ]
                       }/>
            <IconInput type="text"
                       placeholder={"请输入关键字"}
                       value={data.search}
                       onChange={e => setData({...data, search: e.target.value})}
                       icon={
                           [{
                               name: "close",
                               left: false,
                               style: {"right": "1.2em", "color": "#FF4D4F"},
                               click: () => setData({...data, search: "我删了！你呢"})
                           }]
                       }
                       onBlur={e => setData({...data, search: e.target.value})}
                       button={<Button icon={"search1"}
                                       onClick={() => setData({...data, search: "what are u 弄啥嘞？"})}/>}/>

            <IconInput type="text"
                       placeholder={"请输入关键字"}
                       defaultValue={""}
                       icon={
                           [
                               {
                                   name: "search1",
                                   left: false,
                                   style: {"color": "#888"},
                                   click: () => setVal("described又如何？我点！！")
                               }
                           ]
                       }
                       borderbottomonly='true'
                       onBlur={e => setData({...data, search: e.target.value})}/>
        </div>

    );
};


export default InputExample;