import React, {
    ButtonHTMLAttributes, createContext,
    RefObject, useContext, useEffect,
    useRef

} from "react";

() => {
};

const Child = (props: ButtonHTMLAttributes<HTMLButtonElement>,
               ref: RefObject<HTMLButtonElement>) => {
    console.log(ref, "cc");
    setTimeout(() => {
        console.log(ref, "cc");
    }, 1000);
    return <button ref={ref} {...props}>child</button>;
};
const Child2 = React.forwardRef(Child);

//深层传递的关键逻辑：

const Child3 = (props: any,
                ref: RefObject<HTMLButtonElement>) => {
    return <div>
        <p>test</p>
        <Child2 ref={ref} {...props}/>
    </div>;
};

const Child4 = React.forwardRef(Child3);

//深层传递DOM值用Context：

const Context = createContext({} as { [propName: string]: any });

const Sun = (props: any, ref: RefObject<HTMLButtonElement>) => {
    return <button ref={ref} {...props}>ok</button>;
};
const Sun1 = React.forwardRef(Sun);

const Baba = () => {
    const state = useContext(Context);
    const ref1 = useRef(document.body as HTMLButtonElement);
    useEffect(
        () => {
            state.ref = ref1;
            console.log(state.ref.current, 999);
        }, []
    );
    return <div>
        <Sun1 ref={ref1}/>
    </div>;
};
const Yeye = () => {
    const state = useContext(Context);
    setTimeout(
        () => {
            console.log(state, "yeye");
            state.ref.current.style.color = "blue";
        }, 1000
    );
    return <div>
        <Baba/>
    </div>;
};
const ForwardRef = () => {
    const childRef = useRef(document.body as HTMLButtonElement);
    const child4Ref = useRef(document.body as HTMLButtonElement);
    const child5Ref = useRef(document.body as HTMLButtonElement);
    useEffect(
        () => {
            const button = childRef.current;
            console.log(button, "mounted", child4Ref.current);
            setTimeout(
                () => {
                    if (button) {
                        button.style.color = "red";
                    }
                }, 1000
            );
        }, []
    );
    console.log(childRef, "created");


    return (
        <div className={"yr-useState"}>
            <h4>
                forwardRef
            </h4>
            <p>
                有时候想要把ref传给函数子组件，class组件可以，但是函数组件不可以！会报错的！
                props不能传递ref属性！
            </p>
            <p>
                这时候就需要用forwardRef了。
            </p>
            <Child2 ref={childRef}/>
            <p>
                在我看来，它的最大用途就是传递子组件的DOM元素了，可以进行DOM操作！
            </p>
            <p>
                注意，在mounted之后，才能拿到真实的DOM值！
            </p>
            <h4>
                深层嵌套传递的尝试！
            </h4>
            <Child4 ref={child4Ref}/>
            <h4>
                深层的嵌套传递真的很费劲！我想了想，我觉得可以如此！只在父子组件两层搞forwardRef，如果想要
                向高层或者深层传递，就把值通过Context传上或者传下去！
            </h4>
            <Context.Provider value={{ref: child5Ref}}>
                <p>
                    在Yeye组件拿到Sun组件的DOM，修改字体颜色为blue!
                </p>
                <Yeye/>
            </Context.Provider>
            <p>
                在低层用传统套路，在父级拿到ref的DOM值，然后把值设置到Context的公共对象属性上！然后在yeye级
                确实是拿到值了！
            </p>
        </div>
    );
};
export default ForwardRef;