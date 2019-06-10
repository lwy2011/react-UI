import * as React from "react";
import {SetStateAction, useState} from "react";
// import {useReducer} from "react";
//
//
const initialState = "women";
// const reducer = (state: string, action: string) => {
//     console.log(action, state);
//     return action;
// };
const set: React.Dispatch<SetStateAction<string>> = () => {};
const val = {current: initialState, setCurrent: set};

const TabsContext = React.createContext(val);

interface Props {
    defaultCurrent: string,
}

const TabsContextProvider: React.FunctionComponent<Props> = (props) => {
    const [current, setCurrent] = useState(props.defaultCurrent);
    const Provider = TabsContext.Provider;


    return (
        <Provider value={{current, setCurrent}}>
            {props.children}
        </Provider>
    );
};


export {TabsContext, TabsContextProvider};