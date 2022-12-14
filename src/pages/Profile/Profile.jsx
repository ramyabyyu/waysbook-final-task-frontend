import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./Profile.modules.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Path from "../../routeNames";
import { useEffect } from "react";
import noPhoto from "../../assets/no-people.png";
import noImage from "../../assets/noimage.jpg";
import {
  FaEnvelope,
  FaMale,
  FaFemale,
  FaPhone,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaUserAlt,
  FaUserCheck,
  FaCartPlus,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { getProfile, reset } from "../../features/profile/profileSlice";
import {
  getUserBooks,
  getBookPurchaseds,
  reset as bookReset,
  getAllBooks,
} from "../../features/book/bookSlice";
import MainSection from "../../components/MainSection/MainSection";
import {
  formatRupiah,
  noFileAvailable,
  subStr,
} from "../../helpers/bookHelpers";
import { noFileURL } from "../../config/api";

const Profile = () => {
  const { token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { books, bookPurchaseds } = useSelector((state) => state.book);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
      dispatch(getAllBooks());
      dispatch(getBookPurchaseds());
    } else navigate(Path.AUTH);

    return () => {
      dispatch(reset());
      dispatch(bookReset());
    };
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (profile?.id) {
      dispatch(getBookPurchaseds(profile?.id));
    }
  }, [profile, dispatch]);
  return (
    <>
      <Jumbotron height="full" />
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8}>
            <Card className="rounded border-0 p-5 profile__container mt-5">
              <div className="d-flex justify-content-between">
                <div className="me-5">
                  <div className="mt-3">
                    <div className="d-flex mb-3 align-items-start">
                      {profile?.isSeller ? (
                        <RiAdminFill className="text-secondary me-3 fs-1" />
                      ) : (
                        <FaUserAlt className="text-secondary me-3 fs-1" />
                      )}

                      <div>
                        <h5>
                          {profile?.full_name}
                          {profile?.is_seller && (
                            <Badge bg="secondary" className="ms-2">
                              Seller
                            </Badge>
                          )}
                        </h5>
                        <p className="text-muted">Full Name</p>
                      </div>
                    </div>
                    <div className="d-flex mb-3 align-items-start">
                      <FaEnvelope className="text-secondary me-3 fs-1" />
                      <div>
                        <h5>{profile?.email}</h5>
                        <p className="text-muted">Email</p>
                      </div>
                    </div>
                    <div className="d-flex mb-3 align-items-start">
                      {profile?.gender === "-" ? (
                        <>
                          <FaQuestionCircle className="text-secondary me-3 fs-1" />
                          <div>
                            <h5 className="text-danger">Not Set</h5>
                            <p className="text-muted">Gender</p>
                          </div>
                        </>
                      ) : (
                        <>
                          {profile?.gender === "male" ? (
                            <>
                              <FaMale className="text-secondary me-3 fs-1" />
                              <div>
                                <h5>Male</h5>
                                <p className="text-muted">Gender</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <FaFemale className="text-secondary me-3 fs-1" />
                              <div>
                                <h5>Female</h5>
                                <p className="text-muted">Gender</p>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div className="d-flex mb-3 align-items-start">
                      <FaPhone className="text-secondary me-3 fs-1" />
                      <div>
                        <h5
                          className={`${
                            profile?.phone === "-" ? "text-danger" : "text-dark"
                          }`}
                        >
                          {profile?.phone === "-" ? "Not Set" : profile?.phone}
                        </h5>
                        <p className="text-muted">Phone</p>
                      </div>
                    </div>
                    <div className="d-flex mb-3 align-items-start">
                      <FaMapMarkerAlt className="text-secondary me-3 fs-1" />
                      <div>
                        <h5
                          className={`${
                            profile?.address === "-"
                              ? "text-danger"
                              : "text-dark"
                          }`}
                        >
                          {profile?.address === "-"
                            ? "Not Set"
                            : profile?.address}
                        </h5>
                        <p className="text-muted">Address</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-50">
                  <img
                    src={profile?.is_photo_change ? profile?.photo : noPhoto}
                    alt="photo"
                    className="profile__img rounded"
                    id="profile-photo"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="btn-lg w-100 mt-2"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <MainSection>
        <Container>
          {profile?.is_seller ? (
            <>
              <h3 className="text-start">Your Product</h3>
              <Row>
                {books?.map((book) => (
                  <Col md={3} key={book.id} className="me-3 mb-3">
                    <Card
                      className="rounded border-0 shadow p-2"
                      style={{ height: "38rem" }}
                    >
                      <Link
                        className="text-decoration-none"
                        to={Path.BOOK_DETAIL + book.slug}
                      >
                        <img
                          src={book.thumbnail}
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
                        <Button
                          variant="dark"
                          className="mt-5 d-flex justify-content-center align-items-center w-100"
                          type="button"
                          as={Link}
                          to={Path.BOOK_DETAIL + book.slug}
                        >
                          <span>Edit</span>
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <>
              <h3 className="text-start">Your Books</h3>
              <Row>
                {bookPurchaseds.map((bp) => (
                  <>
                    <Col md={3} key={bp.id} className="me-3 mb-3">
                      <Card
                        className="rounded border-0 shadow p-2"
                        style={{ height: "38rem" }}
                      >
                        <img
                          src={bp.book_thumbnail}
                          style={{
                            width: "18rem",
                            height: "20rem",
                            objectFit: "cover",
                          }}
                        />

                        <div className="p-2">
                          <h4 className="font-serif title__book-font">
                            {subStr(bp.book_title, 20)}
                          </h4>
                        </div>
                      </Card>
                    </Col>
                  </>
                ))}
              </Row>
            </>
          )}
        </Container>
      </MainSection>
    </>
  );
};

export default Profile;
