import React, { useContext, useEffect, useState } from "react";
import delt from "./images/delt.svg";
import "../pages/checkout.css";
import { CartProvider, CartContext } from "../pages/CartContext";
import ModalMain from "./Modal";
import { CartWishListProvider, CartWishList } from "../pages/CartWishList";

// Loaded all the files and images

// Made the type of course particular item
type Item = {
  name: string;
  author: string;
  price: number;
  discount: number;
  check: number;
  tags: string[];
};

const CardcheckoutTemplate = (props) => {
  const [cart, setCart] = useContext(CartContext); // Simply using the state cart through useContext Hook
  const [showModal, setShowModal] = useState(false); // Simply using the state Modal through useState Hook
  const [wishList, setWishList] = useContext(CartWishList); // Simply using the state Wishlist through useContext Hook

  function onDelete(id) {
    setCart((cart) => cart.filter((item) => item.check !== id));
  }

  return (
    <div>
      <div className="shopping-CardTemplate">
        <div className="shopping-CardTemplate-1">
          <img
            src="https://www.socialsamosa.com/wp-content/uploads/2016/06/digital-class.jpg"
            width="70"
            height="70"
          />
          <h3 style={{ marginLeft: "0.5em" }}>{props.name}</h3>
        </div>

        <div className="shopping-CardTemplate-2">
          <p style={{ marginRight: "2em", color: "blue", cursor: "pointer" }}>
            MOVE TO WISHLIST
          </p>
          <strong style={{ margin: "1em" }}> Rs {props.price}/-</strong>
          <img
            src={delt}
            width="22pt"
            height="24pt"
            style={{ margin: "1em" }}
            onClick={() => onDelete(props.check)}
          />
        </div>
      </div>
      {showModal ? (
        <ModalMain
          message="Already exist in the cart"
          showModal={setShowModal}
        />
      ) : null}
    </div>
  );
};

export default CardcheckoutTemplate;
