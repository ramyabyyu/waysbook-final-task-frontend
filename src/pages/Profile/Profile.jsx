import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import { Badge, Button, Card } from "react-bootstrap";
import "./Profile.modules.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Path from "../../routeNames";
import { useEffect } from "react";
import noPhoto from "../../assets/no-people.png";
import {
  FaEnvelope,
  FaMale,
  FaFemale,
  FaPhone,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaUserAlt,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { getProfile, reset } from "../../features/profile/profileSlice";

const Profile = () => {
  const { token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    } else navigate(Path.AUTH);

    return () => {
      dispatch(reset());
    };
  }, [token, dispatch, navigate]);

  return (
    <Jumbotron height="full">
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
                    {profile?.is_seller && <Badge bg="secondary">Seller</Badge>}
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
                      profile?.address === "-" ? "text-danger" : "text-dark"
                    }`}
                  >
                    {profile?.address === "-" ? "Not Set" : profile?.address}
                  </h5>
                  <p className="text-muted">Address</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-50">
            <img
              src={noPhoto}
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
    </Jumbotron>
  );
};

export default Profile;
