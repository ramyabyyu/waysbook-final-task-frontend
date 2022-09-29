import React from "react";
import "./Header.modules.css";
import * as Path from "../../routeNames";
import { Link } from "react-router-dom";
import waysbookLogo from "../../assets/Frame.png";
import { Button } from "react-bootstrap";

const Header = () => {
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
            <li className="nav-item">
              <Button variant="dark" as={Link} to={Path.AUTH}>
                Sign In
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
