import * as React from "react";
import Layout from "./layout";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import Aside from "./aside";


const LayoutExample: React.FunctionComponent = () => {
    return (
        <div className='yr-layoutExample'>
            <h3>—— "架子" ——</h3>
            <Layout className="hh" style={{"height": "300px"}}>
                <Header>
                    header
                </Header>
                <Content>
                    content
                </Content>
                <Footer>
                    footer
                </Footer>
            </Layout>
            <h3>—— "演变1" ——</h3>
            <Layout className="hh" style={{"height": "300px"}}>
                <Header>
                    header
                </Header>
                <Layout>
                    <Aside>aside</Aside>
                    <Content>content</Content>
                </Layout>
                <Footer>
                    footer
                </Footer>
            </Layout>
            <h3>—— "演变2" ——</h3>
            <Layout className="hh" style={{"height": "300px"}}>
                <Header>
                    header
                </Header>
                <Layout>
                    <Content>content</Content>
                    <Aside>aside</Aside>
                </Layout>
                <Footer>
                    footer
                </Footer>
            </Layout>
            <h3>—— "演变3" ——</h3>
            <Layout className="hh" style={{"height": "300px"}}>
                <Aside>aside</Aside>
                <Layout>
                    <Header>
                        header
                    </Header>
                    <Content>content</Content>
                    <Footer>
                        footer
                    </Footer>
                </Layout>

            </Layout>
            <Layout>
                <h1>1</h1>
            </Layout>
        </div>
    );
};

export default LayoutExample;