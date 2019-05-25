import React, {FunctionComponent, useEffect, useState} from "react";
import ReactDom from "react-dom";
import {HashRouter as Router, Route, Link} from "react-router-dom";
import Icons from "./lib/icon/icon.example";
import Icon from "./lib/icon/icon";
import "./local.dev.scss";
import Buttons from "./lib/button/button.examlpe";
import Dialogs from "./lib/dialog/dialog.example";
import LayoutExample from "./lib/layout/example";
import Layout from "./lib/layout/layout";
import Header from "./lib/layout/header";
import Aside from "./lib/layout/aside";
import Content from "./lib/layout/content";
import Footer from "./lib/layout/footer";


interface componentNames {
    [key: string]: string
}

const firstTabs: string[] = ["入门", "组件"];
const names: componentNames = {
    icon: "svg图标",
    button: "按钮",
    dialog: "对话框",
    layout: "布局"
};
const RouterView: React.FunctionComponent = () => {
    const link: string = location.hash.replace("#/", "");
    const [tab, setTab] = useState(link);
    const [firTab, setFirTab] = useState("组件");
    const [firShow, setFirShow] = useState(true);
    useEffect(() => {
        tab !== link && setTab(link);
    });
    return (
        <Router>
            <Layout>
                <Aside>
                    {
                        firstTabs.map(
                            val => <ul key={val}>
                                <li>
                                    <header onClick={() => {
                                        setFirTab(val);
                                        setFirShow(!firShow);
                                    }}
                                            className={
                                                firTab === val ? "active" : ""
                                            }>
                                        <Icon name={firTab === val && firShow ? "up" : "down"}/>
                                        <span>{val}</span>
                                    </header>
                                </li>
                                {
                                    firTab === "组件" && val === "组件" && firShow &&
                                    Object.keys(names).map(
                                        key => <li key={key} onClick={() => setTab(key)}>
                                            <Link to={`/${key}`}
                                                  className={tab === key ? "active" : ""}>
                                                {names[key]}
                                            </Link>
                                        </li>
                                    )
                                }

                            </ul>
                        )
                    }
                </Aside>
                <Content>
                    <h3>{firTab}</h3>
                    <h4>{tab}</h4>
                    <Route path="/icon" component={Icons}/>
                    <Route path="/button" component={Buttons}/>
                    <Route path="/dialog" component={Dialogs}/>
                    <Route path="/layout" component={LayoutExample}/>
                </Content>
            </Layout>

        </Router>
    );
};
const App: FunctionComponent = () => {


    return <Layout className="page">
        <Header>
            <h3>React UI</h3>
        </Header>
        <RouterView/>
        <Footer>
            footer
        </Footer>
    </Layout>;
};
//本地开发的页面所用，不涉及上传包，测试
ReactDom.render(<App/>
    , document.getElementById("app"));