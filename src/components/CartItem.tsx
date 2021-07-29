import React from "react";
// import "./App.css";

export default function CartItem(props) {
  const calDiscountPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="p-14">
      <div className="dd-flex">
        <img
          src="https://www.socialsamosa.com/wp-content/uploads/2016/06/digital-class.jpg"
          width="70"
          height="70"
        />
        <div style={{ maxWidth: "200px", marginLeft: "10px" }}>
          <strong>{props.name}</strong>
        </div>
      </div>
      <div className="text-right">
        <strong>Rs. {calDiscountPrice(props.price, props.discount)}/-</strong>
      </div>
      <hr />
    </div>
  );
}
