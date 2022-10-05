import React from "react";
import "./BookDetail.modules.css";
import { useParams } from "react-router-dom";
import { getBookBySlug, reset } from "../../../features/book/bookSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../../../components/Jumbotron/Jumbotron";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import * as Path from "../../../routeNames";
import {
  convertToDate,
  formatRupiah,
  getPrice,
} from "../../../helpers/bookHelpers";
import { useState } from "react";
import { updateBookPromo } from "../../../features/book/bookSlice";
import { FaCartPlus } from "react-icons/fa";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { addToCart } from "../../../features/cart/cartSlice";

const BookDetail = () => {
  const [promoData, setPromoData] = useState({
    discount: "",
  });

  const { slug } = useParams();
  const { books: book } = useSelector((state) => state.book);
  const { token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (bookId, sellerId, subTotal) => {
    const formData = new FormData();
    formData.set("book_id", bookId);
    formData.set("seller_id", sellerId);
    formData.set("subtotal", subTotal);

    dispatch(addToCart(formData));
    navigate(Path.MY_CARTS);
  };

  const handleSetPromo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("book_id", book.id);
    formData.set("discount", promoData.discount);

    dispatch(updateBookPromo(formData));

    navigate(Path.BOOK_DETAIL + book.slug);
  };

  useEffect(() => {
    if (token) {
      dispatch(getBookBySlug(slug));
    } else {
      navigate(Path.AUTH);
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Jumbotron height="full" />
      <Container className="mt-5">
        <Row className="justify-content-centet">
          <Col md={12}>
            <Card className="border-0">
              <div className="d-flex">
                <img
                  src={book.thumbnail}
                  style={{
                    width: "400px",
                    height: "577px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
                <div className="ms-3">
                  <div className="mb-5 d-flex">
                    <div className="me-5">
                      <h2 className="font-serif title__book-font w-100">
                        {book.title}
                      </h2>
                      <p className="text-muted">
                        By. <span className="fst-italic">{book.author}</span>
                      </p>
                    </div>
                    <div>
                      {profile.id !== book.user_id && (
                        <>
                          <Button
                            type="button"
                            variant="dark"
                            className="d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target={`#${book.slug}`}
                          >
                            <FaCartPlus className="me-3" />
                            <span>Add to cart</span>
                          </Button>
                          <ConfirmModal
                            id={book.slug}
                            body={`Add "${book.title}" to cart?`}
                            title="Add to cart"
                            confirmText="Confirm"
                            cancelText="Cancel"
                            confirmVariant="dark"
                            cancelVariant="danger"
                            handleConfirm={() => {
                              handleAddToCart(
                                book.id,
                                book.user_id,
                                getPrice(book.price, book.price_after_discount)
                              );
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <h5>Publication Date</h5>
                    <p>{convertToDate(book.publication_date)}</p>
                  </div>
                  <div className="mb-5">
                    <h5>Pages</h5>
                    <p>{book.pages}</p>
                  </div>
                  <div className="mb-5">
                    <h5 className="text-danger">ISBN</h5>
                    <p>{book.ISBN}</p>
                  </div>
                  <div className="mb-5">
                    <h5>Price</h5>
                    <p className="text-success">Rp. {book.price}</p>
                  </div>
                  {profile?.id === book.user_id && (
                    <>
                      <div className="mb-5">
                        <h5>Promo</h5>
                        {book.is_promo ? (
                          <>
                            <p className="text-success">{book.discount}%</p>
                          </>
                        ) : (
                          <>
                            <p className="text-danger">Not Set</p>
                          </>
                        )}
                      </div>
                      <div className="mb-5">
                        <h5>Price after Discount</h5>
                        <p className="text-success">
                          Rp. {book.price_after_discount}
                        </p>
                      </div>
                      <div className="mb-5">
                        <Form className="d-flex" onSubmit={handleSetPromo}>
                          <Form.Control
                            type="number"
                            placeholder="Set Discount Promo"
                            className="bg-group me-1"
                            name="discount"
                            onChange={(e) =>
                              setPromoData({ discount: e.target.value })
                            }
                          />
                          <Button type="submit" variant="dark">
                            Set
                          </Button>
                        </Form>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-100 mt-3">
                <h3 className="text-start">About This Book</h3>
                <p>{book.description}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookDetail;
