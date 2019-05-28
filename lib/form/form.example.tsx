import Form, {errors, newFormData} from "./form";
import * as React from "react";
import {useEffect, useState} from "react";
import Button from "../button/button";
// import Validator from "./validator";


const FormExample: React.FunctionComponent = () => {
    const [formData, setFormData] = useState<newFormData>({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [fields] = useState([
        {name: "username", label: "用户名", input: {type: "text",}},
        {name: "password", label: "密码", input: {type: "password"}},
        {name: "password", label: "再次输入密码", input: {type: "password"}},

    ]);
    const [test, setTest] = useState(false);
    const rules = [
        {
            key: "username",
            testFn: (data: string) => Boolean(data.trim()),
            warning: "用户名必填!"
        },
        {
            key: "username",
            testFn: (data: string) => Boolean(data.length >= 6),
            warning: "用户名最少6个字符!"
        },
        {
            key: "username",
            testFn: (data: string) => Boolean(data.length < 10),
            warning: "用户名要少于10个字符!"
        },
        {
            key: "password",
            testFn: (data: string) => Boolean(data.trim()),
            warning: "密码必填!"
        },
        {
            key: "password",
            testFn: (data: string) => Boolean(data.match(/\d/) && data.match(/[a-zA-Z]/)),
            warning: "密码要用数字和字母组成!"
        },
    ];
    const testResult = (result: errors) => {
        console.log(result, "result");
        Object.keys(result).length === 0 ? setLoading(true) : setTest(false);
    };
    useEffect(
        () => {
            loading && submit();
        }, [loading]
    );
    const submit = () => {
        console.log(formData, "submit");
    };

    return (
        <div className="formExample1">
            <div>
                {JSON.stringify(formData)}
            </div>
            <Form value={formData} fields={fields}
                  onChange={(newData: newFormData) => {
                      setFormData(newData);
                  }}
                  test={test}
                  rules={rules}
                  testResult={testResult}
                  warningStyle={{"marginLeft": "1em"}}
                  buttons={
                      [
                          <Button message="提交"
                                  onClick={() => setTest(true)}
                                  loading={loading}
                                  state={{
                                      disabled: Boolean(loading || test),
                                      important: !Boolean(loading || test)
                                  }}/>,
                          <Button message="返回"
                                  onClick={() => setLoading(!loading)}/>
                      ]
                  }
            />
        </div>
    );
};

export default FormExample;