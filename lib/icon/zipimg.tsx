import Icon from "./icon";
import * as React from "react";
import {useEffect, useState} from "react";
import zipImg from "../../helpers/zipImg";
import {Img} from "../input/input";
import classes from "../../helpers/classes";


interface props {
    file: File | Blob,
    width: number,
    height: number,
    upload: (data: Img, fn: () => void) => void,
    imgName: string,
    className?: string,

}

const ZipImg: React.FunctionComponent<props> = ({file, width, height, upload, imgName, className}) => {
    const [zip, setZip] = useState(false);
    const zipfn = () => new Promise(
        (resolve) => {
            zipImg(file, width, height, resolve, imgName);
        }
    );
    useEffect(
        () => {
            zip && zipfn().then((res: Img) => {
                upload(res, () => setZip(false));
            });
        }, [zip]
    );
    return <Icon name={"zip"}
                 onClick={() => !zip && setZip(true)}
                 className={classes(zip ? "zip" : "yr-icon-zip", className)}/>;
};
export default ZipImg;