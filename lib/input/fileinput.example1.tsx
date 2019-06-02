import * as React from "react";
// @ts-ignore
import {FileInput, Imgs} from "./input";
import {useState} from "react";
import Button from "../button/button";
import OutputView from "../../helpers/outputView";


const FileInputExample1: React.FunctionComponent = () => {
    const [data, setData] = useState<Imgs>([]);

    const [upload, setUpload] = useState(false);
    const testStr = (data: any) => typeof data === "string" ? data : "";
    console.log(data);
    return (
        <div className="fileInputExample">
            <h4>{"出现在右边"}</h4>
            {
                data[0] &&
                data.map(
                    (img: { [k: string]: string | File }, index: number) => {
                        const {size, title, type} = img;
                        const val1 = typeof size === "string" ? size : "";
                        const val2 = testStr(title);
                        const val3 = testStr(type);
                        return <OutputView key={index}
                                           data={
                                               {size: val1, name: val2, type: val3}
                                           }/>;
                    }
                )
            }
            <FileInput
                icon='img'
                span={"上传"}
                multiple
                upload={upload}
                imgsPosition={"right"}
                imgSize={{width: "6em", height: "6em"}}
                maxSize={{size: "1000000", warning: "图片过大", width: "400", height: "400"}}
                uploadData={(data: Imgs) => setData(data)}/>
            <Button message={"upload"}
                    loading={upload}
                    icon={"upload"}
                    onClick={() => setUpload(!upload)}/>
        </div>
    );
};

export default FileInputExample1;