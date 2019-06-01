import Form, {errors, newFormData} from "./form";
import * as React from "react";
import {useEffect, useState} from "react";
import Button from "../button/button";
import {FormFooter, FormHeader} from "./formItem";
import OutputView from "../../helpers/outputView";


const FormExample1: React.FunctionComponent = () => {
    const [formData, setFormData] = useState<newFormData>({
        username: "",
        password: "",
        passwordTwice: "",
        testCode: ""
    });
    const [loading, setLoading] = useState(false);
    const [fields] = useState([
        {name: "username", label: "用户名", input: {type: "text"}},
        {name: "password", label: "密码", input: {type: "password"}},
        {name: "passwordTwice", label: "再次输入密码", input: {type: "password"}},
        {name: "testCode", label: "验证码", input: {type: "text"}},

    ]);
    const [test, setTest] = useState(false);
    const [errors, setErrors] = useState({});
    const rules = [
        {                                           //id 从1.0开始是第一种类，同种有优先级，越小的优先级越高
            id: 1,
            key: "username",                        //id可以有另外一种功能，就算把warning，给动态替换掉，多语言的锚点,瞎想的。
            testFn: (data: string) => Boolean(data.trim()),
            warning: "用户名必填!",
            async: false
        },
        {
            id: 1.2,
            key: "username",
            testFn: (data: string) => Boolean(data.length >= 6),
            warning: "用户名最少6个字符!",
            async: false
        },
        {
            id: 1.3,
            key: "username",
            testFn: (data: string) => Boolean(data.length < 18),
            warning: "用户名要少于18个字符!",
            async: false
        },
        {
            id: 1.4,
            key: "username",
            testFn: (data: string) => new Promise(
                (resolve, reject) => {
                    setTimeout(
                        () => {
                            const num = 3;
                            console.log(data, "开始验证用户名！", num);
                            num < 4 ? resolve(true) :
                                num > 7 ? resolve(false) :
                                    reject("用户名验证未完成！");
                        }, 4000
                    );
                }
            ),
            warning: "用户名已存在",
            async: true
        },
        {
            id: 1.5,
            key: "username",
            testFn: (data: string) => new Promise(
                (resolve, reject) => {
                    setTimeout(
                        () => {
                            const num = 5;
                            console.log(data, "开始验证用户名1", num);
                            num < 4 ? resolve(true) :
                                num > 7 ? resolve(false) :
                                    reject("用户名验证未完成！");
                        }, 2000
                    );
                }
            ),
            warning: "用户名已存在",
            async: true
        },
        {
            id: 1.6,
            key: "username",
            testFn: (data: string) => new Promise(
                (resolve, reject) => {
                    setTimeout(
                        () => {
                            const num = 8;
                            console.log(data, "开始验证用户名2", num);

                            num < 4 ? resolve(true) :
                                num > 7 ? resolve(false) :
                                    reject("用户名验证未完成！");
                        }, 4000
                    );
                }
            ),
            warning: "用户名已存在",
            async: true
        },
        {
            id: 2,
            key: "password",
            testFn: (data: string) => Boolean(data.trim()),
            warning: "密码必填!",
            async: false
        },
        {
            id: 2.1,
            key: "password",
            testFn: (data: string) => Boolean(data.match(/\d/) && data.match(/[a-zA-Z]/)),
            warning: "密码要用数字和字母组成!",
            async: false
        },
        {
            id: 3,
            key: "passwordTwice",
            testFn: (data: string) => Boolean(data.trim()),
            warning: "请再次输入密码!",
            async: false
        },
        {
            id: 3.1,
            key: "passwordTwice",
            testFn: (data: string) => Boolean(data.match(/\d/) && data.match(/[a-zA-Z]/)),
            warning: "密码要用数字和字母组成!",
            async: false
        },
        {
            id: 3.2,
            key: "passwordTwice",
            testFn: (data: string) => Boolean(formData.password === data),
            warning: "两次密码输入不一致!",
            async: false
        },
        {
            id: 4,
            key: "testCode",
            testFn: (data: string) => Boolean(!data),
            warning: "验证码有误",
            async: false
        }
    ];
    const testResult = (result: errors) => {
        console.log(result, "result");
        Object.keys(result).length === 0 && setLoading(true);
        setErrors(result);
        setTest(false);       //这里有它，就是点一次才检查一次，没它就是第一次点了，就会一直检查下去。
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
            <OutputView data={formData}/>
            <Form value={formData} fields={fields}
                  onChange={(newData: newFormData) => {
                      setFormData(newData);
                  }}
                  test={test}
                  errors={errors}
                  rules={rules}
                  testResult={testResult}
                  justifyStyle={true}
            >
                <FormHeader type={"header"}>
                    <p>{"登录"}</p>
                </FormHeader>
                <FormFooter type={"footer"}>
                    <Button message="提交"
                            onClick={() => setTest(true)}
                            loading={loading}
                            disabled={Boolean(loading || test)}
                            state={{
                                important: !Boolean(loading || test)
                            }}/>
                    <Button message="返回"
                            onClick={() => setLoading(!loading)}/>
                </FormFooter>
            </Form>
        </div>
    );
};

export default FormExample1;