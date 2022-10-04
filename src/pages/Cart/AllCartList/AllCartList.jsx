import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Jumbotron from "../../../components/Jumbotron/Jumbotron";
import "./AllCartList.modules.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findMyCarts,
  reset,
  deleteCart,
} from "../../../features/cart/cartSlice";
import { useEffect } from "react";
import * as Path from "../../../routeNames";
import { formatRupiah } from "../../../helpers/bookHelpers";
import { FaTrashAlt, FaRegMoneyBillAlt } from "react-icons/fa";
import giveMoneyImage from "../../../assets/Vector.png";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";

const AllCartList = () => {
  const [prices, setPrices] = useState([0]);
  const [totalQty, setTotalQty] = useState([0]);

  const { carts } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteCart = (cartId, userId) => {
    const formData = new FormData();

    formData.set("cart_id", cartId);
    formData.set("user_id", userId);

    console.log("cart id = ", cartId);
    console.log("user id = ", userId);

    dispatch(deleteCart(formData));
  };

  useEffect(() => {
    if (token) dispatch(findMyCarts());
    else navigate(Path.AUTH);

    return () => {
      dispatch(reset());
    };
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (carts.length > 0) {
      carts.forEach((cart) => {
        prices.push(cart.subtotal);
        totalQty.push(cart.qty);
      });
    }
  }, [carts]);

  return (
    <>
      <Jumbotron height="full" />

      <Container className="mt-5">
        <h3 className="text-start">Review Your Order</h3>
        <Row className="justify-content-start">
          <Col md={7}>
            <Card className="border-0 border border-top border-dark">
              {carts?.map((cart) => (
                <div
                  className="mb-3 p-2 d-flex position-relative"
                  key={cart.id}
                >
                  <Button
                    variant="light"
                    type="button"
                    className="btn__delete"
                    data-bs-toggle="modal"
                    data-bs-target={`#${cart.slug}`}
                  >
                    <FaTrashAlt />
                  </Button>
                  <ConfirmModal
                    id={cart.slug}
                    title="Are you sure want to delete this cart?"
                    body={`${cart.id}-${cart.user_id}`}
                    handleConfirm={() =>
                      handleDeleteCart(cart.id, cart.user_id)
                    }
                    confirmText="Delete"
                    cancelText="Cancel"
                    confirmVariant="danger"
                    cancelVariant="secondary"
                  />
                  <img
                    src={cart.book_thumbnail}
                    width={130}
                    height={175.5}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="ms-3">
                    <h3 className="font-serif title__book-font w-100">
                      {cart.book_title}
                    </h3>
                    <p className="text-muted">
                      By : <span className="fst-italic">{cart.author}</span>
                    </p>
                    <h4 className="text-success">
                      {formatRupiah(cart.subtotal.toString(), "Rp. ")}
                    </h4>
                  </div>
                </div>
              ))}
            </Card>
          </Col>
          <Col md={5}>
            <Card className="border-0 border border-top border-dark">
              <div className="border-0 border border-bottom border-dark pt-2">
                <div className="d-flex justify-content-between w-100">
                  <h6>Subtotal</h6>
                  <p>
                    {formatRupiah(
                      prices.reduce((prev, curr) => prev + curr).toString(),
                      "Rp. "
                    )}
                  </p>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <h6>Qty</h6>
                  <p>{totalQty.reduce((prev, curr) => prev + curr)}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between w-100 pt-2">
                <h6 className="text-success">Total</h6>
                <p className="text-success">
                  {formatRupiah(
                    prices.reduce((prev, curr) => prev + curr).toString(),
                    "Rp. "
                  )}
                </p>
              </div>
              <div className="d-flex flex-column align-items-end mt-3">
                <div className="trf__proof w-50 mb-2">
                  <img src={giveMoneyImage} className="give__money-img" />
                </div>
                <Button variant="dark" className="w-50" type="button">
                  Pay
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllCartList;
