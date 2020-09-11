import React, {
    ChangeEvent, createContext,
    FormEvent, ReactNode,
    useContext,
    useReducer
} from "react";
import Button from "../button/button";

() => {
};
const initialState = {n: 0};
const reducer = (state: { n: number }, action: { type: string, num: number }) => {
    const {type, num} = action;
    if (type === "+") {
        return {n: state.n + num};
    } else if (type === "*") {
        return {n: state.n * num};
    } else {
        throw new Error("unknown action");
    }
};

const initialState1 = {
    name: "", age: 0
};
const reducer1 = (state: { name: string, age: number }, action: { type: string, val?: string | number }) => {
    const {type, val} = action;
    if (type === "name" || type === "age") {
        return {...state, [type]: val};
    } else if (type === "reset") {
        return initialState1;
    } else {
        throw new Error("action.type不存在！");
    }
};

//代替redux :
const state = {name: "liu", book: "红日"};
const reducerX = (state: { name: string, book: string }, action: { type: string, val: string }) => {
    return {...state, [action.type]: action.val};
};
const Context = createContext({
    state, dispatch: (obj: { type: any, val: string }) => {
    }
});
const provider = (reducer: (state: any, action: { [propName: string]: any }) => any, initialState: any, childrenFn: () => ReactNode) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Context.Provider value={{state, dispatch}}>
        {childrenFn()}
    </Context.Provider>;
};

const User = () => {
    const {state, dispatch} = useContext(Context);
    const setName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "name", val: e.target.value});
    };
    return <input type="text" value={state.name} onChange={setName}/>;
};
const Book = () => {
    const {state, dispatch} = useContext(Context);
    const setBook = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "book", val: e.target.value});
    };
    return <input type="text" value={state.book} onChange={setBook}/>;
};

const Redux = () => {
    const childrenFn = () => {
        return <div>
            <Book/>
            <User/>
        </div>;
    };
    return provider(reducerX, state, childrenFn);
};
const UseState = () => {
    const lists = [
        "创建初始值initialState",
        "创建操作reducer(state,action)",
        "传给useReducer，得到读写api",
        "调用写type操作类型"
    ];
    const [state, dispatch] = useReducer(reducer, initialState);
    const add = () => {
        dispatch({type: "+", num: 1});
    };
    const multiply = () => {
        dispatch({type: "*", num: 2});
    };

    const [formState, dispatch1] = useReducer(reducer1, initialState1);
    const {name, age} = formState;
    const setName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch1({type: "name", val: e.target.value});
    };
    const setAge = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch1({type: "age", val: e.target.value});
    };
    const submit = (e: FormEvent) => {
        e.preventDefault();
        alert(JSON.stringify(formState));
    };
    const reset = () => {
        dispatch1({type: "reset"});
    };
    return (
        <div className={"yr-useState"}>
            <ul>
                {
                    lists.map(
                        (val, ind) => <li key={val}>
                            {ind + 1}、{val}
                        </li>
                    )
                }
            </ul>
            <div style={{margin: "1em auto"}}>
                <p>
                    n={state.n}
                </p>
                <Button message={"+1"} onClick={add}/>
                <Button message={"*2"} onClick={multiply}/>
            </div>
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
            <Redux/>
        </div>
    );
};
export default UseState;