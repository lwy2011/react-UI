import React from "react";
import classes from "../../helpers/classes";
import "./buttons.scss";

interface props extends React.HTMLAttributes<HTMLElement> {

}

const Buttons: React.FunctionComponent<props> = (props) => {
    return (
        <div className={classes("yr-buttons", props.className)}>
            {props.children}
        </div>
    );
};
export default Buttons;