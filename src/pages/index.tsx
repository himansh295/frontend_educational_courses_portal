import React from "react";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Checkout from "./Checkout";
import Wishlist from "./Wishlist";
import Header from "../components/Header";
import { CartProvider, CartContext } from "./CartContext.js";
import { CartWishListProvider, CartWishList } from "./CartWishList.js";

export default function Pages() {
  return (

    // Simply Making the routers , for the connection b/w pages
    <Router>
      <div className="imp-container">
        <Header />
        <CartProvider>
          <CartWishListProvider>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/wishlist" component={Wishlist} />
          </CartWishListProvider>
        </CartProvider>
      </div>
    </Router>
  );
}
