import * as React from "react";
import {useContext, useState} from "react";
import ReactDom from "react-dom";
// import {useReducer} from "react";
//
//

// const reducer = (state: string, action: string) => {
//     console.log(action, state);
//     return action;
// };
// const set: React.Dispatch<SetStateAction<string>> = () => {};
interface styleProps {
    [k: string]: string
}

const style: styleProps = {transition: "all 0s"};
const val = {
    current: "",
    set: (name: string, style: styleProps, first?: boolean) => {},
    style
};

const TabsContext = React.createContext(val);

interface Props {
    defaultCurrent: string,
}

interface lineProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean
}

const Line: React.FunctionComponent<lineProps> = ({visible, ...rest}) => {
    const {style} = useContext(TabsContext);
    // console.log(style)
    const x = visible &&
        <div className="yr-tabs-head-active-line" {...rest} style={style}/>;
    return ReactDom.createPortal(x, document.body);
};

const TabsContextProvider: React.FunctionComponent<Props> = ({defaultCurrent, children}) => {
    const [current, setCurrent] = useState(defaultCurrent);
    const [style, setStyle] = useState<styleProps>({transition: "all 0s"});
    const Provider = TabsContext.Provider;
    const set = (name: string, Style: styleProps, first?: boolean) => {
        !first && setCurrent(name);
        const val = !first ? Style : {...Style, ...style};
        setStyle(val);
    };


    return (
        <Provider value={{current, set, style}}>
            <Line visible={true}/>
            {children}
        </Provider>
    );
};


export {TabsContext, TabsContextProvider};