import * as React from "react";
import Row from "./row";
import Col from "./col";
import "./grid.example.scss";

const GridExample5: React.FunctionComponent = () => {
    return (
        <div className="gridExample">
            <Row>
                <Col span={12} phone={{span: 6}} ipad={{span: 4}}>{"col-12"}</Col>
                <Col span={12} phone={{span: 18}} ipad={{span: 12, offset: 8}}>{"col-12"}</Col>
            </Row>
            <Row>
                <Col phone={{span: 6}} ipad={{span: 5}} nerrowpc={{span: 7}} pc={{span: 8}}>
                    {"col-8"}</Col>
                <Col phone={{span: 12}} ipad={{span: 8, offset: 3}} nerrowpc={{span: 10, offset: 0}} pc={{span: 8}}>
                    {"col-8"}</Col>
                <Col phone={{span: 6}} ipad={{span: 5, offset: 3}} nerrowpc={{span: 7, offset: 0}} pc={{span: 8}}>
                    {"col-8"}</Col>
            </Row>


        </div>
    );
};

export default GridExample5;