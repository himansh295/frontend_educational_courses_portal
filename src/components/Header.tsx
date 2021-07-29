import React from "react";
// import "./App.css";
import hashedinLogo from "./images/Logo-2.png";
import shoppingCart from "./images/shopping-cart.svg";
import profileLogo from "./images/noun_profile_2068277.svg";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header>
        <div className="d-flex headerMain">
          <div>
            <Link to="/">
              <img src={hashedinLogo} className="headerlogo" />
            </Link>
          </div>
          <div className="d-flex">
            <Link to="/">
              <div className="headerContent headerCourse">Courses</div>
            </Link>
            <Link to="/wishlist">
              <div className="headerContent headerWishlist">Wishlist</div>
            </Link>
            <div className="headerContent">
              <Link to="/checkout">
                <img src={shoppingCart} className="headerCart" />
              </Link>
            </div>
            <div className="headerContent">
              <Link to="/profile">
                <img src={profileLogo} className="headerProfile" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
