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

            return () => {
                window.onresize = null;
            };
        }, []
    );


    //计时器，这部分可以抽象出来一个单独的函数，为了不影响父组件的ref，
    //逻辑不多，第一，计时器不能因为组件的刷新而印象，计时器是独立于组件的更新的，销毁的话，组件提供锁就可以的
    // 第二，计时器独立了，它要执行的函数如何引入？ref就是传递的方法。就这两个点，恶心了半天
    //函数内容如下
    // const useInterval = (callback: () => void, cases: boolean | undefined) => {
    //     const intervalRef: React.MutableRefObject<(() => void) | undefined> = useRef();
    //     // const intervalCallback = () => { setTime(time - 1); };
    //
    //     useEffect(
    //         () => {
    //             intervalRef.current = callback;
    //         }
    //     );
    //     useEffect(
    //         () => {
    //             const tick = () => {
    //                 intervalRef && intervalRef.current && intervalRef.current();
    //             };
    //             const Timer = start && setInterval(
    //                 tick, 1000
    //             );
    //             return Timer && !cases ? clearInterval(Timer) : undefined;
    //         }, [cases]
    //     );
    // };
    // 引用它在各个组件就可以的
    const [start, setStart] = useState(false);
    const [time, setTime] = useState(60);

    const intervalRef: React.MutableRefObject<(() => void) | undefined> = useRef();
    const intervalCallback = () => { setTime(time - 1); };

    useEffect(
        () => {
            intervalRef.current = intervalCallback;
        }
    );
    useEffect(
        () => {
            const tick = () => {
                intervalRef && intervalRef.current && intervalRef.current();
            };
            const Timer = start && setInterval(
                tick, 1000
            );
            // console.log(time, Timer, start, tick, "ttt");
            return Timer && !start ? clearInterval(Timer) : undefined;
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
                    <Button message={start ? "what a u 弄啥嘞？" : "开始游戏"}
                            icon={"guilian1"}
                            disabled={start}
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