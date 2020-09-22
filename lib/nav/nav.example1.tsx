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
                    河北省
                    <Icon name={"down"}
                          className={"yr-nav-sub-text-icon " + (visible ? "active" : "")}/>
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
            垂直nav。是否垂直，api为mode，默认为垂直vertical，vertical | horizontal，两个可选值。
        </p>
        <p>
            selected : {JSON.stringify(data1)}
        </p>
        <Nav data={data} updated={updated} mode={"horizontal"}>
        </Nav>
        <p>
            这里实现，除了css要跟原本的分离并且覆盖之外，还有对横向的点击item的默认关闭popover的阻止。
            排版最难的问题是，每一层的文本都缩进多点少点，原本没想到是文本缩进，想了padding,margin,负margin,
            都觉得不对劲！做到这里的时候，才想起来了，这不支持多选，，，
        </p>
        <h4>
            增加点击sub nav可显示隐藏popover的功能踩坑！
        </h4>
        <p>
            修改控制逻辑，新增show来成为唯一控制destroy的state，同时所有的其他逻辑都
            通过show来间接操作destroy，实现popover。
        </p>
        <p>
            useEffect做某个state的watcher的时候，对于didMount和didUpdate木有区分。
            真的很不好！其实做监听的，就应该只负责didUpdate的时候！可是它在didMount的时候，也默认执行。
            给这里的sub nav初始化时由active推出show造成了bug，源于show的监听器里，那段逻辑里有个
            计时器！！它是异步改变show的，为了给销毁前的动画留时间。结果是，我在didMount的时候，用active
            判断set show。刚set好，那个计时器又set回了之前的值了，，，
        </p>
        <p>
            不用异步，才是根本！但是木有动画了！不得不给计时器加了条件！
        </p>
        <p>
            多选，，，暂时没想好数据结构！
        </p>
    </div>;
};

export default Nav1;