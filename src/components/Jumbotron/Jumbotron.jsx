import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Jumbotron.modules.css";

const Jumbotron = ({ children, height }) => {
  return (
    <Row className="justify-content-center jumbotron__container">
      <Col>
        <div
          className={`jumbotron ${
            height === "full" ? "full__height" : "half__height"
          }`}
        >
          <div className="jumbotron__content">{children}</div>
        </div>
      </Col>
    </Row>
  );
};

export default Jumbotron;
