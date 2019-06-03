import * as React from "react";
// @ts-ignore
import {FileInput, Img, Imgs} from "./input";
import {useState} from "react";
import Button from "../button/button";
import OutputView from "../../helpers/outputView";


const FileInputExample: React.FunctionComponent = () => {
    const [data, setData] = useState<Imgs>([]);

    const [upload, setUpload] = useState(false);
    console.log(data);
    return (
        <div className="fileInputExample">
            <h4>{"图片类型限制，最大最小数据量规定，可一次多传，出现在左边"}</h4>
            {
                data[0] &&
                data.map(
                    (img: Img, index: number) => {
                        const {size, name, type} = img;

                        return <OutputView
                            key={index}
                            data={{size, name, type}}/>;
                    }
                )
            }
            <FileInput
                icon='img'
                span={"上传"}
                upload={upload}
                imgsPosition={"left"}
                imgSize={{width: "6em", height: "6em"}}
                multiple
                accept={".png"}
                maxSize={{size: "1638400", warning: "图片超出1M,请压缩！"}}
                minSize={{size: "68400", warning: "图片太小，你行不行？"}}
                uploadData={(data: Imgs) => setData(data)}/>
            <Button message={"upload"}
                    loading={upload}
                    icon={"upload"}
                    onClick={() => setUpload(!upload)}/>
        </div>
    );
};

export default FileInputExample;