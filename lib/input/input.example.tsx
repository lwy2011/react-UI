import * as React from "react";
import Input, {IconInput} from "./input";
import {useState} from "react";
import Button from "../button/button";
import OutputView from "../../helpers/outputView";


const InputExample: React.FunctionComponent = () => {
    const [data, setData] =
        useState<{ [k: string]: any }>({user: "yong", password: "", search: ""});
    const [message, setMsg] = useState("");
    const iconClick = (e: React.MouseEvent, name: string) => {
        console.log(e.target, name);
        name === "close" && setMsg("");
    };
    const update = (e: React.ChangeEvent<HTMLInputElement>, key: string) => setData({...data, [key]: e.target.value});
    const [value, setVal] = useState("看我！disabled");
    const [value1, setVal1] = useState("看我！我可以的");
    const [value2, setVal2] = useState("看我！只读哦");
    const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const code = e.key;
        console.log(e.target);
        const val = "value" in e.target ? e.target["value"] : "";
        console.log(val);
        //加回车，TS报错，key事件对象的target没有value属性，但是我console.log获取到了。
        //很奇怪！！大胆的就用，胆小的，，这里只能做个锁，触发了解锁.
        //这里有受控组件，非受控组件的value的不同，但是，，，控制台都打印出来了，，，不知道是不是google的自优化？？
        code === "Enter" && setMsg(`回车键事件？${val}你要弄啥嘞？`);
    };
    return (
        <div>
            <Input value={value} disabled onChange={e => setVal(e.target.value)}/>
            <Input value={value1} onChange={e => setVal1(e.target.value)}/>
            <Input value={value2} readOnly onChange={e => setVal2(e.target.value)}/>
            <OutputView data={{...data, message}}/>

            <IconInput type="text"
                       onChange={e => update(e, "user")}
                       value={data.user}
                       icon={
                           [
                               {name: "user", left: true}
                           ]
                       }/>
            <IconInput type="password"
                       value={data.password}
                       onChange={e => update(e, "password")}
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
                       onBlur={e => update(e, "search")}
                       icon={
                           [
                               {name: "search", left: false}
                           ]
                       }/>
            <IconInput type="text"
                       placeholder={"请输入关键字"}
                       value={data.search}
                       onChange={e => update(e, "search")}
                       icon={
                           [{
                               name: "close",
                               left: false,
                               style: {"right": "1.2em", "color": "#FF4D4F"},
                               click: () => setData({...data, search: "我删了！你呢"})
                           }]
                       }
                       onBlur={e => update(e, "search")}
                       button={<Button icon={"search1"} state={{important: true}}
                                       onClick={() => setData({...data, search: "what are u 弄啥嘞？"})}/>}/>

            <IconInput
                type="text"
                placeholder={"请输入关键字"}
                defaultValue={""}
                onKeyUp={keyUp}
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
                onBlur={e => update(e, "search")}/>
            <IconInput
                type="text"
                placeholder={"请输入关键字"}
                value={data.search}
                onChange={e => update(e, "search")}
                onKeyUp={keyUp}
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
                borderbottomonly='true'/>
        </div>

    );
};


export default InputExample;