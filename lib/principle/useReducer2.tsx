import React, {
    ChangeEvent, createContext, ReactNode,
    useContext,
    useReducer
} from "react";

() => {
};


//代替redux :
const state = {name: "liu", book: "红日"};
const reducerX = (state: { name: string, book: string },
                  action: { type: string, val: string }) => {
    return {...state, [action.type]: action.val};
};
const Context = createContext({
    state, dispatch: (obj: { type: any, val: string }) => {
    }
});
const provider = (reducer: (state: any, action: { [propName: string]: any }) => any,
                  initialState: any, childrenFn: () => ReactNode) => {
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

    return (
        <div className={"yr-useState"}>
            <h4>模拟redux</h4>
            <Redux/>
        </div>
    );
};
export default UseState;