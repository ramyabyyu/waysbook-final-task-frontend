import React, { useRef } from "react";
import "./AddBook.modules.css";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook, reset } from "../../../features/book/bookSlice";
import { RiHealthBookFill } from "react-icons/ri";
import { useState } from "react";
import { FaPaperclip, FaPhoneAlt, FaPhotoVideo } from "react-icons/fa";
import { useEffect } from "react";
import * as Path from "../../../routeNames";

const initialBookState = {
  title: "",
  author: "",
  p_date: "",
  p_month: "",
  p_year: "",
  pages: "",
  ISBN: "",
  price: "",
  description: "",
  book_file: "",
  thumbnail: "",
};

const AddBook = () => {
  const [bookData, setBookData] = useState(initialBookState);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const { book, isSuccess, isLoading } = useSelector((state) => state.book);

  const hiddenFileInput = useRef(null);
  const handleFileInput = (e) => hiddenFileInput.current.click();
  const handleFileChange = (files) => {
    setBookData({ ...bookData, book_file: files });
  };

  const hiddenImageInput = useRef(null);
  const handleImageInput = (e) => hiddenImageInput.current.click();
  const handleImageChange = (files) => {
    setBookData({ ...bookData, thumbnail: files });
  };

  const handleChange = (e) => {
    setBookData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookData.thumbnail !== "") {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setThumbnailPreview(result);
        document.getElementById("previewContainer").className = "my-4";
        document.getElementById("imgPreview").classList.remove("d-none");
      };
      reader.readAsDataURL(bookData.thumbnail);
    }
  }, [bookData.thumbnail]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      author,
      p_date,
      p_month,
      p_year,
      pages,
      ISBN,
      description,
      price,
      book_file,
      thumbnail,
    } = bookData;

    const publication_date = `${p_year}-${p_month}-${p_date}`;

    const formData = new FormData();
    formData.set("title", title);
    formData.set("author", author);
    formData.set("publication_date", publication_date);
    formData.set("pages", pages);
    formData.set("ISBN", ISBN);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("document", book_file, book_file.name);
    formData.set("image", thumbnail, thumbnail.name);

    dispatch(addBook(formData));
    navigate(Path.PROFILE);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="rounded shadow border-0 p-5">
            <h3 className="text-start mb-5">Add Book</h3>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <h6>Title</h6>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Title"
                  className="bg-group"
                />
              </div>
              <div className="mb-3">
                <h6>Author</h6>
                <Form.Control
                  type="text"
                  name="author"
                  onChange={handleChange}
                  placeholder="Author"
                  className="bg-group"
                />
              </div>
              <div className="mb-3">
                <h6>Publication Date</h6>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Date"
                      name="p_date"
                      onChange={handleChange}
                      className="bg-group"
                    />
                  </Col>
                  <Col>
                    <Form.Select
                      name="p_month"
                      onChange={handleChange}
                      className="bg-group"
                    >
                      <option selected disabled>
                        Month
                      </option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Year"
                      name="p_year"
                      onChange={handleChange}
                      className="bg-group"
                    />
                  </Col>
                </Row>
              </div>
              <div className="mb-3">
                <h6>Pages</h6>
                <Form.Control
                  type="number"
                  placeholder="Pages"
                  name="pages"
                  className="bg-group"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <h6>ISBN</h6>
                <Form.Control
                  type="number"
                  placeholder="ISBN"
                  name="ISBN"
                  className="bg-group"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <h6>Price</h6>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  name="price"
                  className="bg-group"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <h6>Description</h6>
                <Form.Control
                  as="textarea"
                  placeholder="About this book"
                  name="description"
                  className="bg-group"
                  onChange={handleChange}
                  rows={4}
                  style={{ resize: "none" }}
                />
              </div>
              <div className="mb-3 d-flex justify-content-start align-items-center">
                <input
                  type="file"
                  name="book_file"
                  id="book_file"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="d-none"
                  accept="application/pdf"
                  ref={hiddenFileInput}
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-dark d-flex align-items-center me-3"
                  onClick={handleFileInput}
                >
                  <span className="me-2">Attache Book File</span>
                  <FaPaperclip />
                </Button>
                <h6 className="text-muted m-0">{bookData.book_file.name}</h6>
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                  className="d-none"
                  accept="image/*"
                  ref={hiddenImageInput}
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-dark d-flex align-items-center me-3"
                  onClick={handleImageInput}
                >
                  <span className="me-2">Attache Thumbnail</span>
                  <FaPhotoVideo />
                </Button>
              </div>
              <div className="m-0" id="previewContainer">
                <img
                  src={thumbnailPreview}
                  id="imgPreview"
                  className="d-none rounded"
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <Button
                  type="submit"
                  variant="dark"
                  className="d-flex align-items-center"
                >
                  <span>Add Book</span> <RiHealthBookFill className="ms-2" />
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBook;
