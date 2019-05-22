import React, {FunctionComponent, useState} from "react";
import ReactDom from "react-dom";
import {HashRouter as Router, Route, Link} from "react-router-dom";
import Icons from "./lib/icon/icon.example";
import Icon from "./lib/icon/icon";
import "./local.dev.scss";


interface componentNames {
    [key: string]: string
}

const firstTabs: string[] = ["入门", "组件"];
const names: componentNames = {
    icon: "svg图标",
    button: "按钮"
};
const App: FunctionComponent = () => {

    const [tab, setTab] = useState("icon");
    const [firTab, setFirTab] = useState("组件");
    return <div className="page">
        <header>
            <h3>React UI</h3>
        </header>
        <div>
            <Router>
                <aside>
                    {
                        firstTabs.map(
                            val => <ul key={val}>
                                <li>
                                    <header onClick={() => setFirTab(val)}
                                            className={
                                                firTab === val ? "active" : ""
                                            }>
                                        <Icon name="down"/>
                                        <span>{val}</span>
                                    </header>
                                </li>
                                {
                                    firTab === "组件" && val === "组件" &&
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
                </aside>
                <main>
                    <h3>{firTab}</h3>
                    <h4>{tab}</h4>
                    <Route path="/icon" component={Icons}/>
                </main>
            </Router>
        </div>
    </div>;
};
//本地开发的页面所用，不涉及上传包，测试
ReactDom.render(<App/>
    , document.getElementById("app"));