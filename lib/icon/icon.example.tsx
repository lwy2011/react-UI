import React, {Fragment, FunctionComponent, useEffect, useRef, useState} from "react";

import Icon from "./icon";
import {Layout, Header, Content, Footer, Aside} from "../layout/layout";
import "./icon.example.scss";
import {getStyle} from "../../helpers/function";
import {scopeClassName} from "../../helpers/classes";
import Button from "../button/button";


const IconExample: FunctionComponent = () => {
    const sc = scopeClassName("yr-icon");

    const [count, setPoint] = useState(["1"]);
    const setTopView = () => {
        const topWidth = parseFloat(
            getStyle(".top>p ", "width") + "");
        const pointWidth = parseFloat(
            getStyle(".top .yr-icon-point", "width") + "");
        const counts = topWidth / pointWidth;
        counts - 2 > 0 &&
        setPoint(
            Object.keys(Array.from({length: counts - (counts % 1) - 1})));
        console.log(topWidth, pointWidth, counts);
    };


    useEffect(
        () => {
            setTopView();
            window.onresize = setTopView;
            console.log(111, intervalRef);

            const {current} = intervalRef;
            current && current.interval && clearInterval(current.interval);

            return () => {
                window.onresize = null;
            };
        }, []
    );

    const [start, setStart] = useState(false);
    const [time, setTime] = useState(60);

    const intervalRef: { [k: string]: any } = useRef();
    const intervalCallback = () => {
        setTime(time - 1);
    };
    useEffect(
        () => {
            const {current} = intervalRef;

            intervalRef.current = {
                ...current,
                set: intervalCallback
            };
            console.log(intervalRef.current, "ttt");
        }
    );
    useEffect(
        () => {
            const {interval, set} = intervalRef.current;
            if (start && !interval) {
                const tick = () => {
                    intervalRef.current.set();
                };
                const Timer = setInterval(
                    tick, 1000
                );
                intervalRef.current.interval = Timer;
                console.log(time, Timer, set, "ttt");
            }
            if (!start && interval) {
                clearInterval(interval);
                intervalRef.current.interval = undefined;
            }
        }, [start]
    );
    useEffect(
        () => {
            time === 0 && setStart(false);
        }, [time]
    );
    return (
        <div>
            <div>
                <Icon name="alipay"/>
                <Icon name="QQ"/>
                <Icon name="weixin" style={{"color": "#Feac45"}}/>
                <Icon name="loading" className="yr-icon-loading"/>
                <Icon name="search" className="yr-icon-move"/>
            </div>
            <Layout className="iconGame">
                <Header>
                    <Button message={"开始游戏"}
                            icon={"guilian1"}
                            state={{disabled: start}}
                            onClick={() => setStart(true)}/>

                    <p className={sc({"gameTime": true, timeStart: start})}>
                        {
                            start ?
                                <Fragment>
                                    <span>{"剩余时间"}</span>
                                    <span>{time}</span>
                                </Fragment> :
                                <Fragment>
                                    <Icon name='guilian3'/>
                                    <span>{"好怕怕"}</span>
                                </Fragment>
                        }
                    </p>

                    <div className={sc({headerStart: start}, "top")}>
                        <p>
                            <Icon name="point" className={sc("point")}/>
                            {
                                count.map(
                                    val =>
                                        <Icon name="point" key={val} className={sc("point")}/>
                                )
                            }
                        </p>
                        <Icon name='game'/>
                    </div>
                    <p>
                        <span>{"素材们 ："}</span>
                        <Icon name='guilian' className={sc({"guilian": true, start: start})}/>
                        <Icon name='guilian1'/>
                        <Icon name='guilian2'/>
                        <Icon name='guilian3'/>
                        <Icon name='shaizi1'/>

                    </p>
                    <div className="man">
                        <Icon name='man' className="man"/>
                        <Icon name='车架' className="frame"/>
                        <Icon name='轴' className="shaft"/>
                        <Icon name='前车轮' className="aheadRow"/>
                        <Icon name='后车轮' className="afterRow"/>
                    </div>
                </Header>
                <Layout>
                    <Aside>

                    </Aside>
                    <Content>

                    </Content>
                </Layout>
                <Footer>

                </Footer>
            </Layout>
        </div>
    );
};


export default IconExample;