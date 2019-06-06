import * as React from "react";
import Row from "./row";
import Col from "./col";
import "./grid.example.scss";

const GridExample1: React.FunctionComponent = () => {
    return (
        <div className="gridExample">
            <Row>
                <Col span={4}>{"col-4"}</Col>
                <Col span={18} offset={2}>{"col-18"}</Col>
            </Row>
            <Row>
                <Col span={6}>{"col-6"}</Col>
                <Col span={4} offset={2}>{"col-4"}</Col>
                <Col span={2} offset={4}>{"col-2"}</Col>
            </Row>
            <Row>
                <Col span={6}>{"col-6"}</Col>
                <Col span={2}>{"col-2"}</Col>
                <Col span={4} offset={4}>{"col-6"}</Col>
                <Col span={6} offset={2}>{"col-6"}</Col>
            </Row>
            <Row>
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

export default GridExample1;