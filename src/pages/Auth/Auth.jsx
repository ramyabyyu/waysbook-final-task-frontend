import React from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Container,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import "./Auth.modules.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register, login, reset } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as Path from "../../routeNames";
import Jumbotron from "../../components/Jumbotron/Jumbotron";

const initialUserState = {
  full_name: "",
  email: "",
  password: "",
};

const Auth = () => {
  const [userData, setUserData] = useState(initialUserState);
  const [isRegister, setIsRegister] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const { token, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const switchMode = () => {
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) setErrMessage(message);
    if (isSuccess || token) navigate(Path.PROFILE);

    dispatch(reset());
  }, [token, isSuccess, isError, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) dispatch(register(userData));
    else dispatch(login(userData));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="rounded shadow border-0 p-3">
            <div
              className={`alert alert-danger alert-dismissible fade show my-3 ${
                errMessage === "" ? "d-none" : "d-flex"
              }`}
              role="alert"
            >
              <strong>{errMessage}</strong>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
            <h3 className="text-center mb-5">
              {isRegister ? "Register" : "Login"}
            </h3>
            <Form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="mb-3">
                  <Form.Control
                    name="full_name"
                    type="text"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="mb-3">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Button
                  type="submit"
                  variant="dark"
                  className="w-100"
                  disabled={isLoading == true}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" variant="secondary" />
                    </>
                  ) : isRegister ? (
                    "Register"
                  ) : (
                    "Login"
                  )}
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
