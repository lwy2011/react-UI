import Form from "./form";
import * as React from "react";
import {useState} from "react";
import Button from "../button/button";


const FormExample: React.FunctionComponent = () => {
    const [formData] = useState({
        name: "",
        password: ""
    });
    const [fields] = useState([
        {name: "username", label: "用户名", input: {type: "text"}},
        {name: "password", label: "密码", input: {type: "password"}},
    ]);
    return (
        <div className="formExample1">
            <Form value={formData} fields={fields} buttons={[
                <Button message="提交"/>, <Button message="返回"/>
            ]}/>
        </div>
    );
};

export default FormExample;