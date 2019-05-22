import React from "react";
import ReactDom from "react-dom";
import {HashRouter as Router, Route, Link} from "react-router-dom";
import Icon from "./lib/icon/icon.example";

import "./local.dev.scss";

//本地开发的页面所用，不涉及上传包，测试
ReactDom.render(<div className="page">
        <header>
            <h3>React UI</h3>
        </header>
        <div>
            <Router>
                <aside>
                    <ul>
                        <li>
                            <Link to="icon">svg图标</Link>
                        </li>
                    </ul>
                </aside>
                <main>
                    <Route path="/icon" component={Icon}/>
                </main>
            </Router>
        </div>
    </div>
    , document.getElementById("app"));