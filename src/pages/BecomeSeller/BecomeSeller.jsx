import React from "react";
import "./BecomeSeller.modules.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Path from "../../routeNames";
import { changeUserRole, reset } from "../../features/profile/profileSlice";
import Jumbotron from "../../components/Jumbotron/Jumbotron";

const BecomeSeller = () => {
  const [agreementCheck, setAgreementCheck] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { isSuccess, isLoading } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigate(Path.AUTH);
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      navigate(Path.AUTH);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, dispatch]);

  const handleChange = () => {
    setAgreementCheck(!agreementCheck);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(changeUserRole());
  };

  return (
    <Jumbotron height="full">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="rounded shadow border-0 p-3">
            <h3 className="text-center mb-5">Become a Seller</h3>
            <h6>Become seller, and start to sell your book</h6>
            <p className="text-muted">
              In order to become a seller, first you have to agree with our
              privacy policy
            </p>
            <div className="fake__privacy-policy">
              <h6>Our Privacy Policy</h6>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
                nostrum recusandae sit pariatur maxime, et fuga sequi non
                suscipit dolor delectus placeat hic sunt nam mollitia iure
                voluptates commodi numquam ipsam voluptate impedit officia
                magnam. Laborum exercitationem eum, fugit maxime illum assumenda
                dolor, ea, delectus blanditiis libero iste! Assumenda, veritatis
                alias neque odio dignissimos nemo!
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
                nostrum recusandae sit pariatur maxime, et fuga sequi non
                suscipit dolor delectus placeat hic sunt nam mollitia iure
                voluptates commodi numquam ipsam voluptate impedit officia
                magnam. Laborum exercitationem eum, fugit maxime illum assumenda
                dolor, ea, delectus blanditiis libero iste! Assumenda, veritatis
                alias neque odio dignissimos nemo!
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
                nostrum recusandae sit pariatur maxime, et fuga sequi non
                suscipit dolor delectus placeat hic sunt nam mollitia iure
                voluptates commodi numquam ipsam voluptate impedit officia
                magnam. Laborum exercitationem eum, fugit maxime illum assumenda
                dolor, ea, delectus blanditiis libero iste! Assumenda, veritatis
                alias neque odio dignissimos nemo!
              </p>
            </div>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Form.Check
                  type="checkbox"
                  onChange={handleChange}
                  id="agreement"
                  label="I Agree"
                />
              </div>
              <div className="mb-3">
                <Button
                  type="submit"
                  variant="dark"
                  className="w-100"
                  disabled={agreementCheck == false || isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" variant="secondary" />
                  ) : (
                    "Become Seller"
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Jumbotron>
  );
};

export default BecomeSeller;
