import React from "react";
import Nav from "./nav";
import Icon from "../icon/icon";
import "./example.scss";

const Nav1 = () => {
    const data = [
        {
            name: "天津市",
        },
        {
            name: "河北省",
            sub: [
                {
                    name: "保定市"
                },
                {
                    name: "石家庄市"
                },
                {
                    name: "沧州市"
                },
                {
                    name: "保定市1"
                },
                {
                    name: "石家庄市2"
                },
                {
                    name: "沧州市3"
                }
            ],
            slotFn: () => {
                return <div className={"yr-nav-sub-name-slot"}>
                    <Icon name={"down"}/>
                    河北省
                </div>;
            }
        },
        {
            name: "山西省",
            sub: [
                {
                    name: "太原市",
                    sub: [
                        {
                            name: "t1"
                        },
                        {
                            name: "t2"
                        },
                        {
                            name: "t3"
                        }
                    ]
                },
                {
                    name: "大同市",
                    sub: [
                        {
                            name: "d1",
                            sub: [
                                {
                                    name: "d11"
                                },
                                {
                                    name: "d21"
                                },
                                {
                                    name: "d31"
                                }
                            ]
                        },
                        {
                            name: "c2",
                            sub: [
                                {
                                    name: "c21"
                                },
                                {
                                    name: "c22"
                                },
                                {
                                    name: "c23"
                                }
                            ]
                        },
                        {
                            name: "d3"
                        }
                    ]
                },
                {
                    name: "晋城市"
                }
            ]

        },
        {
            name: "广东省",
            sub: [
                {
                    name: "深圳市"
                },
                {
                    name: "广州市"
                },
                {
                    name: "珠海市"
                }
            ]
        },
        {name: "北京市"}
    ];
    return <div style={{marginBottom: "20em"}}>
        <Nav data={data}>
        </Nav>
        <p>
            动画用了animate()，
            查资料因为有
            <a href="https://github.com/web-animations/web-animations-js" target={"_blank"}>
                polyfill。
            </a>
        </p>
        <p>
            因为vue的自带的动画过渡组件transition，对组件的挂载和卸载前专门做了框架层面的设定的！
            我在这里，只能用示例测试，特定的动画消耗时间放在，预设的销毁定时器执行前！动画也很不舒服！
        </p>
    </div>;
};

export default Nav1;