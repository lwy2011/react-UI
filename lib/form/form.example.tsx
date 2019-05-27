import Form, {newFormData} from "./form";
import * as React from "react";
import {useState} from "react";
import Button from "../button/button";


const FormExample: React.FunctionComponent = () => {
    const [formData, setFormData] = useState<newFormData>({
        username: "",
        password: ""
    });
    const [fields] = useState([
        {name: "username", label: "用户名", input: {type: "text",}},
        {name: "password", label: "密码", input: {type: "password"}},
    ]);
    console.log(formData);
    return (
        <div className="formExample1">
            <div>
                {JSON.stringify(formData)}
            </div>
            <Form value={formData} fields={fields}
                  onChange={(newData: newFormData) => {
                      setFormData(newData);
                  }}
                  buttons={[
                      <Button message="提交"/>, <Button message="返回"/>
                  ]}/>
        </div>
    );
};

export default FormExample;