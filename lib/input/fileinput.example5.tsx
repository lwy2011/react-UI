import * as React from "react";
// @ts-ignore
import {FileInput, Img, Imgs} from "./input";
import {useState} from "react";
import Button from "../button/button";
import OutputView from "../../helpers/outputView";


const FileInputExample5: React.FunctionComponent = () => {
    const [data, setData] = useState<Imgs>([]);

    const [upload, setUpload] = useState(false);
    console.log(data);
    return (
        <div className="fileInputExample">
            <h4>{"头像"}</h4>
            {
                data[0] &&
                data.map(
                    (img: Img, index: number) => {
                        const {size, title, type} = img;

                        return <OutputView key={index}
                                           data={
                                               {size, title, type}
                                           }/>;
                    }
                )
            }
            <FileInput
                icon='avarage1'
                span={"上传"}
                upload={upload}
                imgsPosition={"center"}
                imgSize={{width: "6em", height: "6em", borderRadius: "50%"}}
                uploadData={(data: Imgs) => setData(data)}/>
            <Button message={"upload"}
                    loading={upload}
                    icon={"upload"}
                    onClick={() => setUpload(!upload)}/>
        </div>
    );
};

export default FileInputExample5;