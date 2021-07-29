import React, { useContext, useState, useEffect } from "react";
import arrow from "./images/arrow.svg";
import DP from "./images/Logo-2.png";
import { setUncaughtExceptionCaptureCallback } from "process";
import CartItem from "./CartItem";
import Modal from "react-modal";
import ModalMain from "./Modal";
import CardArea from "./CardArea";
import { CartProvider, CartContext } from "../pages/CartContext";
import { CartWishListProvider, CartWishList } from "../pages/CartWishList";
import delt from "./images/delt.svg";

const WishlistCard = (props) => {
  const [wishList, setWishList] = useContext(CartWishList);
  const [cart, setCart] = useContext(CartContext);
  const { name, author, price, discount, check, tags } = props.courseData;
  const [showModal, setShowModal] = useState(false);

  function addCart() {
    for (let item of cart) {
      if (item.check === props.courseData.check) {
        setShowModal(true);
        return;
      }
    }

    let id = props.courseData.check;
    setCart((temp) => [...temp, props.courseData]);
    setWishList((wishList) => wishList.filter((item) => item.check !== id));
  }

  function onDelete() {
    let id = props.courseData.check;
    setWishList((wishList) => wishList.filter((item) => item.check !== id));
  }

  const calDiscountPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <div>
      <div className="CardTemplate">
        <div className="CardImgNameTools">
          <img src={DP} />
          <div className="CardCourseNameandButton">
            <div
              style={{
                textAlign: "left",
                font: "normal normal 600 18pt/22pt Montserrat",
                letterSpacing: "0pt",
                color: "#080808",
                opacity: 1,
                maxWidth: "400px",
              }}
            >
              {name}
            </div>
            <div className="tools">
              <ul>
                {tags.map((tag) => (
                  <li>
                    <button className="issues-button">{tag}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          style={{
            paddingTop: "1em",
            font: "normal 300 16px 19px montserrat",
            letterSpacing: "0px",
            color: "#080808",
            opacity: "1",
            fontSize: "30px",
          }}
        >
          {author}
        </div>
        <img src={delt} onClick={onDelete} />
        <div className="PriceDiscount">
          <p
            style={{
              marginLeft: "1.5em",
              marginRight: "3em",
              marginTop: "1.5em",
              fontSize: "x-large",
            }}
          >
            <strong> Rs {calDiscountPrice(price, discount)} /- </strong>
          </p>
          <p
            style={{
              marginLeft: "1.5em",
              marginRight: "2em",
              marginTop: "2em",
              color: "grey",
              fontSize: "large",
            }}
          >
            <del>Rs {price} /- </del>
          </p>
          <button style={{ marginLeft: "2em" }} onClick={addCart}>
            Add to Cart
          </button>
          <img
            src={arrow}
            style={{ marginLeft: "1.5em", width: "10px", marginRight: "1em" }}
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

export default WishlistCard;
