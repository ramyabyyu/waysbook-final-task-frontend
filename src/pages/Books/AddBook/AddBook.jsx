import React from "react";
import "./AddBook.modules.css";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addBook } from "../../../features/book/bookSlice";
import { useState } from "react";

const initialBookState = {
  title: "",
  publication_date: "",
  publication_month: "",
  publication_year: "",
  page: "",
  ISBN: "",
  price: "",
  description: "",
};

const AddBook = () => {
  const [bookData, setBookData] = useState(initialBookState);

  const handleChange = (e) => {
    setBookData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="rounded shadow border-0 p-5">
            <h3 className="text-center">Add Your Product</h3>
            <Form>
              <div className="mb-3">
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChange}
                />
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBook;
