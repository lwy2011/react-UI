import * as React from "react";
import {useReducer} from 'react'

const reducer = action => {current:action}


const TabsContext = (defaultCurrent) => {
    const myContext = React.createContext()
    const ContextProvider = props => {
        const [current, setCurrent] = useReducer({reducer,
        {current:defaultCurrent}
    }
    }
)
return (
    <myContext.Provider value={{current, setCurrent}}>
        {props.children}
    </myContext.Provider>
)
}
return ContextProvider()
}


export default TabsContext;