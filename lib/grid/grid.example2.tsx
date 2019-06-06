import * as React from "react";
import Row from "./row";
import Col from "./col";
import "./grid.example.scss";

const GridExample2: React.FunctionComponent = () => {
    return (
        <div className="gridExample">
            <Row gutter={16}>
                <Col span={12}>{"col-12"}</Col>
                <Col span={12}>{"col-12"}</Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>{"col-8"}</Col>
                <Col span={8}>{"col-8"}</Col>
                <Col span={8}>{"col-8"}</Col>
            </Row>
            <Row gutter={16}>
                <Col span={6}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
            </Row>
            <Row gutter={16}>
                <Col span={4}>{"col-4"}</Col>
                <Col span={4}>{"col-4"}</Col>
                <Col span={4}>{"col-4"}</Col>
                <Col span={4}>{"col-4"}</Col>
                <Col span={4}>{"col-4"}</Col>
                <Col span={4}>{"col-4"}</Col>
            </Row>
        </div>
    );
};

export default GridExample2;