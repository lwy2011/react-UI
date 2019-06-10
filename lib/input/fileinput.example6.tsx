import * as React from "react";
// @ts-ignore
import {FileInput, Img, Imgs} from "./input";
import {useState} from "react";
import Button from "../button/button";
import OutputView from "../../helpers/outputView";


const FileInputExample6: React.FunctionComponent = () => {
    const [data, setData] = useState<Imgs>([]);

    const [upload, setUpload] = useState(false);
    // console.log(data);
    return (
        <div className="fileInputExample">
            <h4>{"只提供图片数据，预览自己DIY"}</h4>
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
                icon='avarage1'
                span={"上传"}
                upload={upload}
                imgsPosition={"noNeed"}
                uploadData={(data: Imgs) => setData(data)}/>
            <Button message={"upload"}
                    loading={upload}
                    icon={"upload"}
                    onClick={() => setUpload(!upload)}/>
        </div>
    );
};

export default FileInputExample6;