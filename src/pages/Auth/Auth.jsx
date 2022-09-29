import React from "react";
import { Row, Col, Card, Button, Form, Container } from "react-bootstrap";
import { useState } from "react";
import "./Auth.modules.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const switchMode = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="rounded shadow border-0 p-3">
            <h3 className="text-center mb-5">
              {isRegister ? "Register" : "Login"}
            </h3>
            <Form>
              {isRegister && (
                <div className="mb-3">
                  <Form.Control
                    name="full_name"
                    type="text"
                    placeholder="Full Name"
                  />
                </div>
              )}
              <div className="mb-3">
                <Form.Control name="email" type="email" placeholder="Email" />
              </div>
              <div className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-3">
                <Button type="button" variant="dark" className="w-100">
                  {isRegister ? "Register" : "Login"}
                </Button>
              </div>
              <div className="mb-3 d-flex justify-content-center">
                <p className="text-muted">
                  {isRegister
                    ? "Already have an account? Login "
                    : "Don't have an account? Create "}{" "}
                  <span
                    className="click__here-btn text-primary"
                    onClick={switchMode}
                  >
                    here
                  </span>
                </p>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
