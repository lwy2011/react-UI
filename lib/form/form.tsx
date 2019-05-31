import * as React from "react";

import "./form.scss";
import {Fragment, ReactElement, ReactNode, useState} from "react";
import Input from "../input/input";
import {scopeClassName} from "../../helpers/classes";
import Icon from "../icon/icon";

export interface newFormData {
    [k: string]: any
}

export interface FormRule {
    id: number,
    key: string,
    warning: string,
    testFn: (data: any, errors?: errors) => boolean | string | Promise<{}> | undefined | null,
    async: boolean,
}

type FormRules = Array<FormRule>

export interface errors {[k: string]: string[]}

interface Props {
    value: newFormData,
    fields: Array<{ name: string, label: string, input: { type: string } }>,
    buttons: ReactNode[],
    onChange: (value: newFormData) => void,
    rules?: FormRules,
    errors?: errors,
    test?: boolean,
    testResult?: (data: errors) => void,
    warningStyle?: { [k: string]: string },
    justifyStyle?: boolean,
    children?: ReactElement[],                      //用过断言了，所以，必须是用FormHeader/FormFooter等包裹进来的
    childrenConfig?: { [k: string]: boolean }
}

const Form: React.FunctionComponent<Props> = (props) => {
    const {errors, test, justifyStyle, warningStyle, value, children} = props;

        const inputText = (Value: string | number, name: string) => {   //onChange
            const newFormDate = {...value, [name]: Value};
            props.onChange(newFormDate);
        };

        const arrTest = (obj: { [k: string]: string[] }, key: string, res: string) =>
            Array.isArray(obj[key]) ? obj[key].push(res) : obj[key] = [res];


        const validator =
            (data: newFormData, rules: FormRules): void => {
                const warning: any = {};
                //同步的验证
                rules.map(
                    rule => !rule.async &&
                        !rule.testFn(data[rule.key]) && arrTest(warning, rule.key, rule.warning)
                );


                const asyncArr = rules.filter(
                    rule => rule.async
                );
                const testFnArr = asyncArr.length > 0 ?
                    asyncArr.map(
                        rule =>
                            (rule.testFn(data[rule.key]) as Promise<{}>)  //强制断言，筛选出异步的，才可以断言
                                .then(
                                    (res: boolean) => !res && arrTest(warning, rule.key, rule.warning),
                                    (err: string) => arrTest(warning, rule.key, err)
                                )
                    ) : false;
                // const normals =  rules.filter(rule => !rule.async);
                // const normalArr:string[] = normals.length === 0 ? []:
                //     normals.map(rule => !rule.testFn(data[rule.key]) && [rule.key, rule.id+'',rule.warning] )
                //         .filter(val => val && val.length === 3 );
                // const testFnArr1 = asyncArr.length > 0 ?
                //     asyncArr.map(
                //         rule =>
                //             (rule.testFn(data[rule.key]) as Promise<{}>)  //强制断言，筛选出异步的，才可以断言
                //                 .then(
                //                     (res: boolean) => !res && [rule.key,rule.id+'', rule.warning],
                //                     (err: string) => [rule.key,rule.id+'', err]
                //                 )
                //     ) : false;

                // asyncArr.length === 0 ?
                //     props.testResult && props.testResult(normalArr) :
                //
                // Promise.all(testFnArr1 as Array<Promise<{}>>).then(
                //     (res: Array<string[]|false>) => {
                //         // @ts-ignore //这里用filter给筛选了false的占位们了。
                //         const filter:Array<string[]> = normalArr.concat(
                //             res.filter(val => Boolean(val))
                //         );
                //         const maxArr:Array<string[]> = filter.length > 1 ?
                //             filter.sort((a:Array<string>,b:Array<string>)=>Number(b[1]) - Number(a[1])): filter;
                //
                //         console.log(res, normalArr, "hhhh", filter,maxArr);
                //         // props.testResult && props.testResult( maxArr )  //验证信息回流给父组件
                //     }
                // );
                asyncArr.length === 0 ?
                    props.testResult && props.testResult(warning) :  //验证信息回流给父组件
                    Promise.all(testFnArr as Array<Promise<{}>>).then(    //强制断言,这里也是先确定有异步才可以断言
                        () =>
                            props.testResult && props.testResult(warning), //验证信息回流给父组件
                        () =>
                            props.testResult && props.testResult(warning)
                    );
            };

        props.rules && props.test && validator(value, props.rules);  //触发验证并返回验证信息给父组件


        const sc = scopeClassName("yr-form");

        const [errorsView, setErrorsView] = useState<number[]>([]);  //控制验证信息展示的数量

        const [tested, setTested] = useState(false);
        !tested && props.test && setTested(true);      //首测过没,测试过之后的标识

        const viewIconClick = (index: number) => {
            const ind = errorsView.indexOf(index);
            const val = ind >= 0 ? errorsView.filter(
                (val, index) => index !== ind
            ) : [...errorsView, index];
            const nodes = document.querySelectorAll(".yr-form-errorsUl");
            console.log(index, nodes, nodes[index]);

            nodes[index].classList.add("yr-form-fadeOut");
            ind < 0 ? setErrorsView(val) :
                setTimeout(() => setErrorsView && setErrorsView(val), 1000);

        };
    const testChild = Array.isArray(children);
    const childType = (type: string) => testChild &&
        children!.filter((a: { [k: string]: any }) => a.type.name === type)[0];
        return (
            <form className="yr-form">
                {
                    console.log(children, testChild)
                }
                {
                    childType("FormHeader")
                }
                {
                    childType("FormItem")
                }
                <table className="yr-form-table">
                    <tbody>
                    {
                        props.fields.map(
                            (data, index) => {
                                const {name, input} = data;
                                const viewTest = errorsView.indexOf(index) >= 0;
                                const viewIcon =
                                    <Icon name={viewTest ? "up" : "down"}
                                          className={sc({iconUp: viewTest, iconDown: !viewTest})}
                                          onClick={() => viewIconClick(index)}/>;

                                const errorsShow = errors && errors[name] &&
                                    <ul className={sc({
                                        errorsUl: true,
                                        absolute: viewTest,
                                        fadeOut: !viewTest
                                    })}>
                                        {
                                            errors[name].map(
                                                (val: string, ind) =>
                                                    <li key={ind}
                                                        className="noIcon"
                                                        style={warningStyle || {}}>
                                                        {val}
                                                    </li>
                                            )
                                        }
                                        <li>{viewIcon} </li>
                                    </ul>;

                                const errorsHidden = errors && errors[name] &&
                                    <ul className={sc({errorsUl: true})}>
                                        {
                                            errors[name].map(
                                                (val: string, ind) => ind === 0 &&
                                                    <li key={ind}
                                                        style={warningStyle || {}}>
                                                        {
                                                            ind === 0 && !viewTest &&
                                                            errors[name].length > 1 && viewIcon
                                                        }
                                                        {val}
                                                    </li>
                                            )
                                        }
                                    </ul>;

                                return (
                                    <Fragment key={index}>
                                        <tr className={sc("tr")}>
                                            <td className={sc({td: true, label: true, justify: Boolean(justifyStyle)})}>
                                                <p>
                                                    {data.label.split("").map((val, index) => <span
                                                        key={index}>{val}</span>)}
                                                </p>
                                            </td>
                                            <td className={sc("td")}>
                                                {
                                                    test && <Icon name='search' className="yr-icon-move"/>
                                                }
                                                <Input type={input.type}
                                                       value={props.value[name]}
                                                       onChange={
                                                           (e) =>
                                                               inputText(e.target.value, name)}/>

                                            </td>
                                        </tr>
                                        {
                                            <tr className={sc("tr")}>
                                                <td className={sc("td")}/>
                                                <td className={sc({"td": true, errors: true})}>
                                                    {
                                                        errors && errors[name] ?
                                                            <Fragment>
                                                                {viewTest ? errorsShow : errorsHidden}
                                                                {viewTest && <p>&nbsp;</p>}
                                                            </Fragment> :
                                                            (tested && !props.test ? <Icon name="testok"/> : <p>&nbsp;</p>)
                                                    }
                                                </td>
                                            </tr>
                                        }
                                    </Fragment>
                                );
                            }
                        )
                    }
                    <tr className={sc("tr")}>
                        <td className={sc("td")}/>
                        <td className={sc("td")}>
                            {
                                props.buttons.map(
                                    (button, index) =>
                                        <Fragment key={index}>
                                            {button}
                                        </Fragment>
                                )
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                {
                    childType("FormFooter")
                }
            </form>
        );
    }
;
export default Form;