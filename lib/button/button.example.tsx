import * as React from "react";
import Button from "./button";
import {useState} from "react";
import ButtonBox from "./buttons";

const Buttons: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);

    return (
        <div className='buttons'>
            <Button message="下载" loading={loading} onClick={() => setLoading(!loading)} state={{disabled: loading}}/>
            <Button message="下载" loading={loading1} onClick={() => setLoading1(!loading1)} icon={"download"}/>
            <ButtonBox>
                <Button message="向左" icon='left'/>
                <Button message='ok'/>
                <Button message="向右" icon='right' right={true}/>
            </ButtonBox>
        </div>
    );
};

export default Buttons;