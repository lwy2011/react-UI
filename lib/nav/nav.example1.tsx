import React, {useState} from "react";
import Nav, {Item} from "./nav";
import Icon from "../icon/icon";
import "./nav.example.scss";


const Nav1 = () => {
    const [data1, update] = useState(["d"]);
    const data: Item[] = [
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
            slotFn: (visible) => {
                //传递出来了popover的visible的值，用于对icon加动画的！预留给开发者自己定制！
                return <div className={"yr-nav-sub-name-slot"}>
                    <Icon name={"down"}
                          className={"yr-nav-sub-text-icon " + (visible ? "active" : "")}/>
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
    const updated = (data: string[]) => {
        update(data);
    };
    return <div style={{marginBottom: "20em"}}>
        <p>
            垂直nav。
        </p>
        <p>
            selected : {JSON.stringify(data1)}
        </p>
        <Nav data={data} updated={updated} mode={"horizontal"}>
        </Nav>

    </div>;
};

export default Nav1;