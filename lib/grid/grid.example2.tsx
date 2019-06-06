import * as React from "react";
import Row from "./row";
import Col from "./col";
import "./grid.example.scss";

const GridExample2: React.FunctionComponent = () => {
    const child = <div style={{background: "#1A90FF", height: "3em"}}/>;
    return (
        <div className="gridExample gutter">
            <h4>{"gutter属性"}</h4>

            <Row gutter={16}>
                <Col span={12}>{child}</Col>
                <Col span={12}>{child}</Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>{child}</Col>
                <Col span={8}>{child}</Col>
                <Col span={8}>{child}</Col>
            </Row>
            <Row gutter={16}>
                <Col span={6}>{child}</Col>
                <Col span={6}>{child}</Col>
                <Col span={6}>{child}</Col>
                <Col span={6}>{child}</Col>
            </Row>
            <Row gutter={16}>
                <Col span={4}>{child}</Col>
                <Col span={4}>{child}</Col>
                <Col span={4}>{child}</Col>
                <Col span={4}>{child}</Col>
                <Col span={4}>{child}</Col>
                <Col span={4}>{child}</Col>
            </Row>
        </div>
    );
};

export default GridExample2;