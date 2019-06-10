import * as React from "react";
// @ts-ignore
import {FileInput, Img, Imgs} from "./input";
import {useState} from "react";
import Button from "../button/button";
import OutputView from "../../helpers/outputView";


const FileInputExample4: React.FunctionComponent = () => {
    const [data, setData] = useState<Imgs>([]);

    const [upload, setUpload] = useState(false);
    // console.log(data);
    return (
        <div className="fileInputExample">
            <h4>{"出现在本身"}</h4>
            {
                data[0] &&
                data.map(
                    (img: Img, index: number) => {
                        const {size, name, type} = img;

                        return <OutputView key={index}
                                           data={
                                               {size, name, type}
                                           }/>;
                    }
                )
            }
            <FileInput
                icon='img'
                span={"上传"}
                upload={upload}
                imgsPosition={"center"}
                imgSize={{width: "6em", height: "6em"}}
                uploadData={(data: Imgs) => setData(data)}/>
            <Button message={"upload"}
                    loading={upload}
                    icon={"upload"}
                    onClick={() => setUpload(!upload)}/>
        </div>
    );
};

export default FileInputExample4;