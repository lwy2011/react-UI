import Icon from "./icon";
import * as React from "react";
import {useEffect, useState} from "react";
import zipImg from "../../helpers/zipImg";
import {Img} from "../input/input";


interface props {
    file: File | Blob,
    width: number,
    height: number,
    upload: (data: Img) => void,
    imgName: string
}

const ZipImg: React.FunctionComponent<props> = ({file, width, height, upload, imgName}) => {
    const [zip, setZip] = useState(false);
    const zipfn = () => new Promise(
        (resolve) => {
            zipImg(file, width, height, resolve, imgName);
        }
    );
    useEffect(
        () => {
            zip && zipfn().then((res: Img) => {
                upload(res);
                setZip(false);
            });
        }
    );
    return <Icon name={"zip"}
                 onClick={() => !zip && setZip(true)}
                 className={zip ? "zip" : "yr-icon-zip"}/>;
};
export default ZipImg;