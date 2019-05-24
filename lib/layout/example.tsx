import * as React from "react";
import Layout from "./layout";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";


const LayoutExample: React.FunctionComponent = () => {
    return (
        <div className='yr-layoutExample'>
            <Layout className="hh">
                <Header>

                </Header>
                <Content>

                </Content>
                <Footer>

                </Footer>
            </Layout>
        </div>
    );
};

export default LayoutExample;