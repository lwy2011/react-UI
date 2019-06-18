import * as React from "react";
import {scopeClassName} from "../../helpers/classes";
import "./slides.scss";
import {slidesContext, SlidesContextProvider} from "./slides.context";
import {useContext, useEffect} from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

const sc = scopeClassName("yr-slides");
const SlidesInner: React.FunctionComponent<Props> = ({children}) => {
    const {current, set} = useContext(slidesContext);

    useEffect(
        () => {
            const ids = Array.isArray(children) && children.map(
                (item) => item && typeof item === "object" && ("props" in item) && item.props.ID
            ).filter(val => val);
            if (!ids || ids.length === 0) return;
            set(current, ids);
        }, []
    );

    return (
        <div className={sc("window")}>
            <div className={sc("box")}>
                {children}
            </div>
        </div>
    );
};

interface props1 extends Props {
    default: string,
    delay: number,
}

const Slides: React.FunctionComponent<props1> = ({className, children, delay, ...rest}) => {

    return (
        <div className={sc("", className)} {...rest}>
            <SlidesContextProvider default={rest.default} delay={delay}>
                <SlidesInner>
                    {children}
                </SlidesInner>
            </SlidesContextProvider>
        </div>
    );
};

export default Slides;