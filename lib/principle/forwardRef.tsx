import React, {
    ButtonHTMLAttributes,
    RefObject, useEffect,
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

//传递的关键逻辑：

const Child3 = (props: any,
                ref: RefObject<HTMLButtonElement>) => {
    return <div>
        <p>test</p>
        <Child2 ref={ref} {...props}/>
    </div>;
};

const Child4 = React.forwardRef(Child3);
const ForwardRef = () => {
    const childRef = useRef(document.body as HTMLButtonElement);
    const child4Ref = useRef(document.body as HTMLButtonElement);
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
        </div>
    );
};
export default ForwardRef;