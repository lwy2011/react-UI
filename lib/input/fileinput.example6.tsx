import * as React from "react";
// @ts-ignore
import {FileInput, Imgs} from "./input";
import {useState} from "react";
import Button from "../button/button";
import OutputView from "../../helpers/outputView";


const FileInputExample6: React.FunctionComponent = () => {
    const [data, setData] = useState<Imgs>([]);

    const [upload, setUpload] = useState(false);
    const testStr = (data: any) => typeof data === "string" ? data : "";
    console.log(data);
    return (
        <div className="fileInputExample">
            <h4>{"只提供图片数据，预览自己DIY"}</h4>
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
                icon='avarage1'
                span={"上传"}
                upload={upload}
                imgsPosition={"noNeed"}
                imgSize={{width: "6em", height: "6em", borderRadius: "50%"}}
                uploadData={(data: Imgs) => setData(data)}/>
            <Button message={"upload"}
                    loading={upload}
                    icon={"upload"}
                    onClick={() => setUpload(!upload)}/>
        </div>
    );
};

export default FileInputExample6;