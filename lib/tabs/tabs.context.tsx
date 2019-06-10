import * as React from "react";
import {useEffect, useState} from "react";
import {SetStateAction} from "react";
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

// interface Props extends React.ProviderProps<{}> {
//     defaultCurrent:string,
// }

const TabsContextProvider: React.FunctionComponent = (props) => {
    const [current, setCurrent] = useState(initialState);
    const Provider = TabsContext.Provider;

    useEffect(
        () => {
            const {children} = props;
            const head = Array.isArray(children) && children.filter(
                child => child && typeof child === "object"
                    && "props" in child && child.props.tabs
            );
            const tabs = head && head[0];
            // @ts-ignore
            console.log(head, tabs.props);
        }, [current]
    );
    return (
        <Provider value={{current, setCurrent}}>
            {props.children}
        </Provider>
    );
};


export {TabsContext, TabsContextProvider};