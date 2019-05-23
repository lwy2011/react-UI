import * as React from "react";
import Button from "./button";
import {useState} from "react";

const Buttons: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(true);
    return (
        <div className='buttons'>
            <Button message='ok'/>
            <Button icon="left"/>
            <Button icon="right"/>
            <Button message="向下" icon='down'/>
            <Button message="向下" icon='down' right={true}/>
            <Button message="下载" icon='loading' loading={loading} onClick={() => setLoading(!loading)}/>
        </div>
    );
};

export default Buttons;