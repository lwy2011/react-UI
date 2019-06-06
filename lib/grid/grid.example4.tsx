import * as React from "react";
import Row from "./row";
import Col from "./col";
import "./grid.example.scss";

const GridExample4: React.FunctionComponent = () => {
    return (
        <div className="gridExample">
            <h4>{"布局测试"}</h4>

            <div className="layout">
                <Row>
                    <Col span={8}>
                        <Row>
                            <Col>1</Col><Col>2</Col><Col>3</Col><Col>4</Col>
                        </Row>
                    </Col>
                    <Col span={12} offset={4}>
                        <Row justify={"flex-end"}>
                            <Col>1</Col><Col>2</Col><Col>3</Col><Col>4</Col><Col>5</Col><Col>6</Col><Col>7</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>{"col-8"}</Col>
                    <Col span={12}>{"col-8"}</Col>
                    <Col span={8}>{"col-8"}</Col>
                </Row>
                <Row className={"footer"}>
                    <Col span={6}>
                        <Row align={"center"} className={"imgBox"} justify={"center"}>
                            <Col className={"imgCol"}>

                                <img
                                    src="https://cn.bing.com/th?id=OIP.GrGkavFEjUFdumUw1uJVuAHaHi&pid=PersonalBing&rs=1&p=0"
                                    alt="img"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>{"col-6"}</Col>
                    <Col span={6}>{"col-6"}</Col>
                    <Col span={6}>{"col-6"}</Col>
                </Row>
            </div>


            <Row>
                <Col span={4} order={6}>{"col-1"}</Col>
                <Col span={4} order={5}>{"col-2"}</Col>
                <Col span={4} order={4}>{"col-3"}</Col>
                <Col span={4} order={3}>{"col-4"}</Col>
                <Col span={4} order={2}>{"col-5"}</Col>
                <Col span={4} order={1}>{"col-6"}</Col>
            </Row>

        </div>
    );
};

export default GridExample4;