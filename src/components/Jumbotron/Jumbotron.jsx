import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Jumbotron.modules.css";

const Jumbotron = () => {
  return (
    <Row className="justify-content-center jumbotron__container">
      <Col>
        <div className="jumbotron">
          <div className="jumbotron__text">
            <h2>With us, you can shop online &#38; help</h2>
            <h2>save your high street at the same time</h2>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Jumbotron;
