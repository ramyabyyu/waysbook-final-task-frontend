import React, { useEffect } from "react";
import "./Home.modules.css";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import MainSection from "../../components/MainSection/MainSection";
import { noFileURL } from "../../config/api";
import noImage from "../../assets/noimage.jpg";
import popUp from "../../assets/Pop-up.png";
import {
  getAllBooks,
  getPromoBooks,
  reset,
} from "../../features/book/bookSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  subStr,
  formatRupiah,
  noFileAvailable,
  getPrice,
} from "../../helpers/bookHelpers";
import { FaCartPlus, FaUserCheck } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Path from "../../routeNames";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { books, promoBooks, isLoading } = useSelector((state) => state.book);
  const { profile } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (bookId, sellerId, subTotal) => {
    const formData = new FormData();
    formData.set("book_id", bookId);
    formData.set("seller_id", sellerId);
    formData.set("subtotal", subTotal);

    dispatch(addToCart(formData));
  };

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getPromoBooks());
    return () => {
      dispatch(reset()); // reseting getAllBooks action
      dispatch(reset()); // reseting getPromoBooks action
    };
  }, [dispatch, navigate]);

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
          <img src={popUp} className={!showPopup && "d-none"} />
          <Row className="mb-5">
            <h3 className="text-muted">Promo Today</h3>
            {promoBooks?.map((promoBook) => (
              <Col md={10} key={promoBook.id} className="me-3 mb-3">
                <Card
                  className="rounded shadow border-0"
                  style={{ height: "25rem", width: "35rem" }}
                >
                  <div className="d-flex">
                    <Link
                      className="text-decoration-none"
                      to={Path.BOOK_DETAIL + promoBook.slug}
                    >
                      <img
                        src={noFileAvailable(
                          promoBook.thumbnail,
                          noFileURL,
                          noImage
                        )}
                        style={{
                          width: "18rem",
                          height: "25rem",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <div className="p-3">
                      <h4 className="font-serif title__book-font">
                        {subStr(promoBook.title, 21)}
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
                      {profile?.id === promoBook.user_id ? (
                        <Button
                          variant="dark"
                          className="mt-5 d-flex justify-content-center align-items-center w-100"
                          disabled
                        >
                          <FaUserCheck className="me-2" />
                          <span>
                            {token ? "You are the owner" : "Login First"}
                          </span>
                        </Button>
                      ) : (
                        <>
                          {token ? (
                            <>
                              <Button
                                variant="dark"
                                className="mt-5 d-flex justify-content-center align-items-center w-100"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={`#${promoBook.slug}`}
                              >
                                <FaCartPlus className="me-2" />
                                <span>Add to Cart</span>
                              </Button>
                              <ConfirmModal
                                id={promoBook.slug}
                                body={`Add "${promoBook.title}" to cart?`}
                                title="Add to cart"
                                confirmText="Confirm"
                                cancelText="Cancel"
                                confirmVariant="dark"
                                cancelVariant="danger"
                                handleConfirm={() => {
                                  handleAddToCart(
                                    promoBook.id,
                                    promoBook.user_id,
                                    getPrice(
                                      promoBook.price,
                                      promoBook.price_after_discount
                                    )
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <Button
                              variant="dark"
                              className="mt-5 d-flex justify-content-center align-items-center w-100"
                              as={Link}
                              to={Path.AUTH}
                            >
                              Login First
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <h3 className="text-muted">List Book</h3>
            {books?.map((book) => (
              <Col md={3} key={book.id} className="me-3 mb-3">
                <Card
                  className="rounded border-0 shadow p-2"
                  style={{ height: "30rem" }}
                >
                  <Link
                    className="text-decoration-none"
                    to={Path.BOOK_DETAIL + book.slug}
                  >
                    <img
                      src={noFileAvailable(book.thumbnail, noFileURL, noImage)}
                      style={{
                        width: "18rem",
                        height: "20rem",
                        objectFit: "cover",
                      }}
                    />
                  </Link>

                  <div className="p-2">
                    <h4 className="font-serif title__book-font">
                      {subStr(book.title, 20)}
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
