import * as React from "react";
import Button from "./button";
import {useState} from "react";
import ButtonBox from "./buttons";

const Buttons: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);

    return (
        <div className='buttons'>
            <Button message='ok'/>
            <Button icon="left" style={{"padding": ".5em"}}/>
            <Button icon="right" style={{"padding": ".2em"}}/>
            <Button icon="close" className="warning"
                    style={{"border": "none", "background": "#000", "padding": 0, "borderRadius": "50%"}}/>
            <Button message="向下" icon='down' iconMargin=".3em"/>
            <Button message="向下" icon='down' right={true}/>
            <Button message="下载" loading={loading} onClick={() => setLoading(!loading)} disabled={loading}/>
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