import * as React from "react";
import Row from "./row";
import Col from "./col";
import "./grid.example.scss";

const GridExample4: React.FunctionComponent = () => {
    return (
        <div className="gridExample">
            <Row>
                <Col span={12}>{"col-12"}</Col>
                <Col span={12}>{"col-12"}</Col>
            </Row>
            <Row>
                <Col span={8}>{"col-8"}</Col>
                <Col span={8}>{"col-8"}</Col>
                <Col span={8}>{"col-8"}</Col>
            </Row>
            <Row>
                <Col span={6}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Row>
                        <Col span={6}>{"col-7"}</Col>
                        <Col span={6}>{"col-7"}</Col>
                    </Row>
                </Col>
                <Col span={6}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
            </Row>
            <Row gutter={24}>
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