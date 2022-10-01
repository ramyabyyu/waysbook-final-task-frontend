import React, { useEffect } from "react";
import "./Home.modules.css";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import MainSection from "../../components/MainSection/MainSection";
import { noFile } from "../../config/api";
import noImage from "../../assets/noimage.jpg";
import {
  getAllBooks,
  getPromoBooks,
  reset,
} from "../../features/book/bookSlice";
import { useSelector, useDispatch } from "react-redux";
import { subStr } from "../../helpers/subStr";
import { formatRupiah } from "../../helpers/formatRupiah";
import { FaCartPlus } from "react-icons/fa";

const Home = () => {
  const { books, promoBooks, isLoading } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getPromoBooks());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <>
      <Jumbotron height="half" />
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="home__jumbotron">
              <h2 className="jumbotron__text">
                With us, you can shop online &#38; help
              </h2>
              <h2 className="jumbotron__text">
                save your high street at the same time
              </h2>
            </div>
          </Col>
        </Row>
      </Container>
      <MainSection>
        <Container className="mb-5">
          {/* Promo Book Section */}
          <Row className="mb-5">
            <h3 className="text-muted">Promo Today</h3>
            {promoBooks?.map((promoBook) => (
              <Col md={10} key={promoBook.id} className="me-3 mb-3">
                <Card
                  className="rounded shadow border-0"
                  style={{ height: "25rem", width: "35rem" }}
                >
                  <div className="d-flex">
                    <img
                      src={
                        promoBook.thumbnail !== noFile
                          ? promoBook.thumbnail
                          : noImage
                      }
                      style={{
                        width: "18rem",
                        height: "25rem",
                        objectFit: "cover",
                      }}
                    />
                    <div className="p-3">
                      <h4 className="font-serif title__book-font">
                        {subStr(promoBook.title, 34)}
                      </h4>
                      <h6 className="text-muted fw-normal">
                        By :{" "}
                        <span className="text-muted fst-italic">
                          {promoBook.author}
                        </span>
                      </h6>
                      <p className="description font-serif">
                        "{subStr(promoBook.description, 83)}"
                      </p>
                      <div>
                        <h6 className="text-muted m-0">
                          <span className="text-decoration-line-through">
                            {formatRupiah(promoBook.price.toString(), "Rp. ")}
                          </span>
                          <Badge bg="danger" className="ms-2">
                            {promoBook.discount}% off
                          </Badge>
                        </h6>
                        <h4 className="text-success">
                          {formatRupiah(
                            promoBook.price_after_discount.toString(),
                            "Rp. "
                          )}
                        </h4>
                      </div>
                      <Button
                        variant="dark"
                        className="mt-5 w-100 d-flex align-items-center justify-content-center"
                      >
                        <FaCartPlus className="me-2" />
                        <span>Add to Cart</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          {/* List Book Section */}
          <Row>
            <h3 className="text-muted">List Book</h3>
            {books?.map((book) => (
              <Col md={3} key={book.id} className="me-3 mb-3">
                <Card
                  className="rounded border-0 shadow p-2"
                  style={{ height: "38rem" }}
                >
                  <img
                    src={book.thumbnail !== noFile ? book.thumbnail : noImage}
                    style={{
                      width: "18rem",
                      height: "25rem",
                      objectFit: "cover",
                    }}
                  />

                  {/* Title */}
                  <div className="p-4">
                    <h4 className="font-serif title__book-font">
                      {subStr(book.title, 34)}
                    </h4>
                    <h6 className="text-muted fw-normal">
                      By :{" "}
                      <span className="text-muted fst-italic">
                        {book.author}
                      </span>
                    </h6>
                    <h4 className="text-success">
                      {book.price_after_discount != 0
                        ? formatRupiah(
                            book.price_after_discount.toString(),
                            "Rp. "
                          )
                        : formatRupiah(book.price.toString(), "Rp. ")}
                    </h4>
                    <Button
                      variant="dark"
                      className="mt-5 d-flex justify-content-center align-items-center w-100"
                    >
                      <FaCartPlus className="me-2" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </MainSection>
    </>
  );
};

export default Home;
