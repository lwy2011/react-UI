import * as React from "react";
import classes, {scopeClassName} from "../../helpers/classes";
import "./input.scss";
import Icon from "../icon/icon";
import {Fragment, ReactElement, useEffect, useState} from "react";
import ReactDom from "react-dom";
import {getStyle} from "../../helpers/function";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FunctionComponent<Props> = ({className, ...rest}) => {
    return (
        <input className={classes("yr-input", className)} {...rest}/>
    );
};

export default Input;

interface IconProps extends Props {
    icon?: Array<{
        name: string,
        left: boolean,
        style?: { [k: string]: string },
        click?: (e: React.MouseEvent, name: string) => any
    }>,
    button?: ReactElement,
    borderbottomonly?: string,
    iconName?: string,
}

const isc = scopeClassName("yr-scopedInput-icon");
const psc = scopeClassName("yr-scopedInput-input");

const IconInput: React.FunctionComponent<IconProps> = ({className, icon, onChange, button, ...rest}) =>
    <div className={classes("yr-scopedInput", className)}>
        {
            icon && icon.map((val, index) =>
                <Fragment key={index}>
                    <Icon name={val.name}
                          style={val.style ? val.style : {}}
                          className={isc({left: val.left, right: !val.left, click: Boolean(val.click)})}
                          onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              return val.click && val.click(e, val.name);
                          }}/>
                </Fragment>
            )
        }
        <Input {...rest} onChange={onChange} className={psc(
            {
                "": true,
                "button": Boolean(button),
                left: Boolean(icon && icon.filter(val => val.left).length > 0),
                right: Boolean(icon && icon.filter(val => !val.left).length > 0),
            }, rest.borderbottomonly ? "yr-input-borderBottom" : ""
        )}/>

        {
            button && button
        }
    </div>;


interface previewProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string,
    show: boolean,
    close: () => void,
}

type Imgs = Array<propsObj>
export {Imgs};
const ImgPreview: React.FunctionComponent<previewProps> = ({src, show, close, ...rest}) => {
    const cs = scopeClassName("yr-img-preview");
    const [width, setWidth] = useState<number | null>(null);
    useEffect(
        () => {
            const baseWidth = getStyle(".yr-img-preview-box", "width");
            console.log(baseWidth, "bbb");
            baseWidth && setWidth(parseInt(baseWidth));
        }, []
    );
    const bigerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setWidth(width! + 50);
    };
    const smallerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setWidth(width! - 150 > 0 ? width! - 50 : width);
    };
    const x = show &&
        <div className={cs("")}>
            <div className={cs("mask")} {...rest} onClick={() => close()}/>
            <div onClick={smallerClick}
                 className={cs("box")}
                 style={width ? {width: width, maxWidth: width} : {}}>
                <img src={src} alt="img"
                     onClick={bigerClick}/>
                <p className={cs("remind")}>
                    {"点击图片，放大！点击边框，缩小！"}
                </p>
            </div>
        </div>;
    console.log(width, "www");
    return ReactDom.createPortal(x, document.body);
};

const PreviewSet = (src: string, show: boolean) => {
    const div = document.createElement("div");
    document.body.append(div);
    const closeFn = () => {
        ReactDom.render(React.cloneElement(component, {show: false})
            , div);
        ReactDom.unmountComponentAtNode(div);
        div.remove();
    };
    const component = <ImgPreview src={src} show={show} close={closeFn}/>;

    ReactDom.render(component, div);
    // return closeFn;
};

interface fileProps extends Props {
    icon?: string,
    button?: ReactElement,
    span?: string,
    upload: boolean,
    uploadData: (imgs: Imgs) => void,
    imgsPosition: string,
    imgSize: { [k: string]: string },
}

interface propsObj {
    [k: string]: string | File
}

const fsc = scopeClassName("yr-fileInput");
const loadImg = (files: File[], fn: (data: propsObj, index: number) => void) =>
    files.map(
        (file, index) => {
            const reader = new FileReader();
            reader.onerror = () => {
                alert(file.name + "error");
            };
            reader.onloadend = () => {
                const obj: propsObj = {};
                obj.src = typeof reader.result === "string" ? reader.result : "";
                obj.title = file.name;
                obj.file = file;
                obj.size = file.size + "";
                obj.type = file.type;
                console.log(obj, 222);
                fn(obj, index);
            };
            reader.readAsDataURL(file);
        }
    );

const FileInput: React.FunctionComponent<fileProps> =
    ({className, icon, uploadData, button, src, span, upload, imgsPosition, imgSize, ...rest}) => {
        const [imgs, setImgs] = useState<Imgs>([]);
        const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            files && files.length > 0 &&
            loadImg(
                Array.from(files),
                (data) => {
                    setImgs([...imgs, data]);
                    // index === files.length - 1 && (e.target.value = '')
                });
            e.target.value && (e.target.value = "");
            console.log(files, e.target.value);
        };

        const deleteImg = (index: number) => {
            const now = [...imgs];
            now.splice(index, 1);
            setImgs(now);
            uploadData(now);
        };
        useEffect(
            () => { upload && uploadData(imgs); }
        );
        const isc = scopeClassName("yr-fileInput-img");
        const inputChildDom = <Fragment>
            {
                (icon || span) &&
                <div className={fsc("prompt")}>
                    {icon && <Icon name={icon}/>}
                    {span && <span>{span}</span>}
                </div>
            }
            <input {...rest}
                   onChange={e => getData(e)}
                   className="yr-fileInput-input"
                   type='file'/>
        </Fragment>;
        const imgLists =
            <Fragment>
                {
                    (imgsPosition === "right" || imgsPosition === "left" || imgs[0]) &&
                    <ul className={isc({"box": true, [imgsPosition]: true}, "yr-fileInput")}>
                        {
                            imgsPosition === "right" &&
                            <li className={classes("yr-fileInput", "yr-fileInput-inputBox")}>
                                {inputChildDom}
                            </li>
                        }
                        {imgs[0] &&
                        imgs.map(
                            (img, index) => {
                                const src = typeof img.src === "string" ? img.src : "";
                                return (
                                    <li key={index} className={isc("list")} style={imgSize}>
                                        <div className={fsc("mask")} style={imgSize}/>
                                        <img style={imgSize}
                                             className={fsc("img")}
                                             src={src}
                                             alt="img"/>

                                        <span className={fsc("iconBox")}>
                                                <Icon name={"close"}
                                                      onClick={() => deleteImg(index)} className={fsc("close")}/>
                                                <Icon name={"view"}
                                                      onClick={() => PreviewSet(src, true)} className={fsc("view")}/>
                                            </span>
                                    </li>
                                );
                            }
                        )
                        }
                        {
                            imgsPosition === "left" &&
                            <li className={classes("yr-fileInput", "yr-fileInput-inputBox")}>
                                {inputChildDom}
                            </li>
                        }
                    </ul>
                }
            </Fragment>;


        const inputDom = <div className={classes("yr-fileInput", "yr-fileInput-inputBox")}
                              style={imgsPosition === "center" ? imgSize : {}}>
            {
                imgsPosition !== "center" ? inputChildDom :
                    (imgs.length > 0 ? imgLists : inputChildDom)
            }
        </div>;

        console.log(imgs);
        return (
            <div className={classes("yr-input-file", className)}>
                {(imgsPosition === "up" || imgsPosition === "left" || imgsPosition === "right") && imgLists}
                {(imgsPosition === "up" || imgsPosition === "down" || imgsPosition === "center") && inputDom}
                {(imgsPosition === "down") && imgLists}
            </div>
        );
    };


export {IconInput, FileInput, PreviewSet};