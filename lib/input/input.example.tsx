import * as React from "react";
import Input, {IconInput} from "./input";
import {useState} from "react";
import Button from "../button/button";
import OutputView from "../../helpers/outputView";
import Icon from "../icon/icon";
import classes from "../../helpers/classes";


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
        //是react本身搞的鬼？？反正警告我了，可以去控制台看，这个val在react里非黑即白。
        //这里我不优化，当做纪念了。第六个例子触发的。
        code === "Enter" && setMsg(`回车键事件？${val}你要弄啥嘞？`);
    };
    //非受控组件在这里有react警告，暂时不影响使用，我猜如果有坑，那就是在diff算法了，大家可以看看
    const tabs = [
        "受控组件！！——keys:user",
        "受控组件！！——keys:password",
        "onBlur事件，受控组件！！——keys:message",
        "onBlur事件，非受控组件！！——keys:search,value",
        "onBlur事件，button和icon点击事件，受控组件！！——keys:search",
        "onBlur事件，keyUp，icon点击事件，非受控组件!!——keys:search,value,message",
        "onBlur事件，keyUp，icon点击事件，受控组件！！——keys:search,value,message"
    ];
    const inputs = [
//        "受控组件！！——keys:user",
        <IconInput type="text"
                   onChange={e => update(e, "user")}
                   value={data.user}
                   icon={
                       [
                           {name: "user", left: true}
                       ]
                   }/>,

//        "受控组件！！——keys:password",
        <IconInput type="password"
                   value={data.password}
                   onChange={e => update(e, "password")}
                   icon={
                       [
                           {name: "password", left: true},
                           {name: "key", left: false}
                       ]
                   }/>,

//        "onBlur事件，受控组件！！——keys:message",
        <IconInput type="text"
                   value={message}
                   onChange={e => setMsg(e.target.value)}
                   onBlur={() => setMsg(message + "输入完毕!可以检验！")}
                   icon={
                       [
                           {name: "close", left: false, style: {"color": "#FF4D4F"}, click: iconClick}
                       ]
                   }/>,

//        "onBlur事件，非受控组件！！——keys:search",
        <IconInput type="text"
                   placeholder={"请输入关键字"}
                   defaultValue={""}
                   onBlur={e => update(e, "search")}
                   icon={
                       [
                           {name: "search", left: false}
                       ]
                   }/>,

//        "onBlur事件，button和icon点击事件，受控组件！！——keys:search",
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
                                   onClick={() => setData({...data, search: "what are u 弄啥嘞？"})}/>}/>,

        //        "onBlur事件，keyUp，icon点击事件，非受控组件!!——keys:search,value,message",
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
            onBlur={e => update(e, "search")}
        />,

//        "onBlur事件，keyUp，icon点击事件，受控组件！！——keys:search,value,message"
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
    ];
    const [current, setCurrent] = useState(0);
    const [tabsView, setTabs] = useState(false);

    const tabsDom = tabsView ?
        <ul className={"yr-input-tabs-ul"} onClick={() => setTabs(false)}>
            {
                tabs.map(
                    (tab, index) =>
                        <li key={index}
                            onClick={() => {
                                setCurrent(index);
                            }}
                            className={classes("yr-input-tabs-li", current === index ? "active" : "")}>
                            {tab}
                        </li>
                )
            }
        </ul> :
        <Icon name={"directory"}
              onClick={() => setTabs(!tabsView)}
              className={"yr-input-tabs-icon"}/>;

    return (
        <div>
            <h4 style={{color: "red"}}>{"受控组件亲儿子!非受控组件，react不待见！！！"}</h4>
            <Input value={value} disabled onChange={e => setVal(e.target.value)}/>
            <Input value={value1} onChange={e => setVal1(e.target.value)}/>
            <Input value={value2} readOnly onChange={e => setVal2(e.target.value)}/>
            <OutputView data={{...data, message, value: value1}}/>
            {tabsDom}
            <h4>{tabs[current]}</h4>
            {inputs[current]}
        </div>

    );
};


export default InputExample;