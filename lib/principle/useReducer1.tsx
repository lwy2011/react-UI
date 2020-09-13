import React, {
    ChangeEvent,
    FormEvent,
    useReducer
} from "react";

() => {
};


const initialState = {
    name: "", age: 0
};
const reducer = (state: { name: string, age: number }, action: { type: string, val?: string | number }) => {
    const {type, val} = action;
    if (type === "name" || type === "age") {
        return {...state, [type]: val};
    } else if (type === "reset") {
        return initialState;
    } else {
        throw new Error("action.type不存在！");
    }
};


const UseState = () => {

    const [formState, dispatch] = useReducer(reducer, initialState);
    const {name, age} = formState;
    const setName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "name", val: e.target.value});
    };
    const setAge = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "age", val: e.target.value});
    };
    const submit = (e: FormEvent) => {
        e.preventDefault();
        alert(JSON.stringify(formState));
    };
    const reset = () => {
        dispatch({type: "reset"});
    };
    return (
        <div className={"yr-useState"}>
            <h4>
                useReducer强力解耦，独立性强，是useState的升级版。
            </h4>

            <p>form表单实例</p>
            <p>{JSON.stringify(formState)}</p>
            <form action="" onSubmit={submit} onReset={reset}>
                <div>
                    <label htmlFor="name">
                        <input type="text" value={name} onChange={setName}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="age">
                        <input type="text" value={age} onChange={setAge}/>
                    </label>
                </div>
                <button type={"submit"}>submit</button>
                <button type={"reset"}>reset</button>
            </form>
            <h4>模拟redux</h4>
        </div>
    );
};
export default UseState;