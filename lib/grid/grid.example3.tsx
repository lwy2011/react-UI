import * as React from "react";
import Row from "./row";
import Col from "./col";
import "./grid.example.scss";

const GridExample3: React.FunctionComponent = () => {
    return (
        <div className="gridExample justify">
            <Row justify={"center"}>
                <Col span={4}>{"col-12"}</Col>
                <Col span={12}>{"col-12"}</Col>
            </Row>
            <Row align={"center"} justify={"space-between"}>
                <Col span={8}>{"col-8"}</Col>
                <Col span={4}>{"col-8"}</Col>
                <Col span={6}>{"col-8"}</Col>
            </Row>
            <Row justify={"flex-end"} align={"flex-end"}>
                <Col span={4}>{"col-6"}</Col>
                <Col span={6}>{"col-6"}</Col>
                <Col span={3}>{"col-6"}</Col>
                <Col span={1}>{"col-6"}</Col>
            </Row>
            <Row align={"center"} justify={"space-around"}>
                <Col span={3}>{"col-4"}</Col>
                <Col span={2}>{"col-4"}</Col>
                <Col span={4}>{"col-4"}</Col>
                <Col span={2}>{"col-4"}</Col>
                <Col span={1}>{"col-4"}</Col>
                <Col span={4}>{"col-4"}</Col>
            </Row>
        </div>
    );
};

export default GridExample3;