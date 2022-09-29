import React from "react";
import "./Header.modules.css";
import * as Path from "../../routeNames";
import { Link } from "react-router-dom";
import waysbookLogo from "../../assets/Frame.png";
import noPhoto from "../../assets/no-people.png";
import { Button, Dropdown, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserAlt, FaCommentAlt } from "react-icons/fa";
import { getProfile, reset } from "../../features/profile/profileSlice";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      dispatch(getProfile());
    }

    return () => {
      dispatch(reset());
    };
  }, [token, isLogin, dispatch]);

  return (
    <nav className="navbar navbar-expand-lg waysbook__navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand" to={Path.HOME}>
          <img src={waysbookLogo} alt="logo" width={80} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#waysbookNavbar"
          aria-controls="waysbookNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="waysbookNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLogin ? (
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle id="user-dropdown" className="dropdown__btn">
                    <img
                      src={
                        profile?.photo !== "http://localhost:8080/uploads/-"
                          ? profile?.photo
                          : noPhoto
                      }
                      alt="photo"
                      width={40}
                      className="rounded-pill"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={Path.PROFILE}>
                      <FaUserAlt className="text-dark me-2" />
                      <span>Profile</span>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={Path.PROFILE}>
                      <FaCommentAlt className="text-dark me-2" />
                      <span>Complain</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li className="nav-item">
                <Button variant="dark" as={Link} to={Path.AUTH}>
                  Sign In
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;