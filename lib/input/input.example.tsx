import * as React from "react";
import Input, {IconInput} from "./input";
import {useState} from "react";


const InputExample: React.FunctionComponent = () => {
    const [data, setData] =
        useState<{ [k: string]: any }>({user: "yong", password: ""});


    return (
        <div>
            <Input/>
            <div>
                {JSON.stringify(data)}
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
        </div>
    );
};


export default InputExample;