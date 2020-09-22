import React, {useState} from "react";
import Nav, {Item} from "./nav";
import Icon from "../icon/icon";
import "./nav.example.scss";


const Nav1 = () => {
    const [data1, update] = useState(["d"]);
    const data: Item[] = [
        {
            name: "天津市", disabled: true
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
                            name: "t1", disabled: true
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
                            ],
                            disabled: true
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
            selected : {JSON.stringify(data1)}
        </p>
        <Nav data={data} updated={updated}>
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
        <p>
            react自己做动画控制真的很不好！挂载时的动画，比较好做一点，卸载的动画真的是有些麻烦的。
        </p>
        <h4>开始动画</h4>
        <p>
            挂载时的动画，难点在于，DOM初始状态肯定要看不见的！从无到有！这时候更适合用css添加动画！
            但是css添加动画，无法设置具体值形式的，限制了某些不是以百分比形式设置宽高的DOM。这里我用了JS。
        </p>
        <p>
            必须要获取高度，所以DOM要有！只能设置opacity。
            拿到高度后，再设置高度为0，可见。然后才是设置动画的阶段！动画最后要把高度为0的设置去掉，，，
        </p>
        <h4>结束动画</h4>
        <p>
            难点在于，组件要卸载，只有一个useEffect可以触发，尝试了return函数内设计动画，失败！因为动画异步！
        </p>
        <p>
            如何让动画执行完了，组件再卸载？我尝试在回调函数尾部加了一个自增千万次的循环，，，
            确实销毁时停顿了，但是动画木有！
            我现在想想，应该是GUI跟JS两个引擎不能同时工作的缘故！JS一直在工作，循环做完了，也要执行卸载了，动画依旧在等待！
        </p>
        <p>
            所以，我只能曲线救国，人为模拟控制willUnmount时间控制问题。引入新变量，加入控制destroy逻辑！
        </p>
        <p>
            已经有active变量来确定组件是否要挂载销毁，destroy变量真实判断是否销毁，active变了，计时器延迟
            设置destroy值，同时子组件通过判断active，设置动画。
        </p>
        <p>
            我想了想，可以专门抽象出来做出react的transition组件。
            当然，没有vue的那种从框架层级进行的动画设置，更加优雅，动画流畅。
        </p>
        <p>
            hooks的痛点也有很多，从动画这里就显示了，太简陋了，而且如果预留一个组件destroy的控制api会更好。
        </p>
        <p>
            对于nav，我原本考虑用css进行显示和隐藏，性能更好的。但是涉及到动画了，我更其倾向于
            关联到组件的生命周期，这样更有意义的。如果只是display设置，那就简单了！
        </p>
    </div>;
};

export default Nav1;