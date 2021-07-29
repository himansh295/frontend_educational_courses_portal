import React, { useContext, useState } from "react";
import Dashboard from "../components/Dashboard";
import CardArea from "../components/CardArea";
import "./checkout.css";

import { CartProvider, CartContext } from "./CartContext";
import CardcheckoutTemplate from "../components/CardcheckoutTemplate";
import CourseCard from "../components/CourseCard";
import ModalMain from "../components/Modal";

import * as dataList from "../mock.json";

type Item = {
  name: string;
  author: string;
  price: number;
  discount: number;
  check: number;
  tags: string[];
};

export default function Checkout() {
  const [cart, setCart] = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  function addPrice() {
    let x = 0;
    for (let item of cart) {
      x += item.price;
    }
    return x;
  }

  function search(id) {
    let x = 0;
    for (let item of cart) {
      if (id === item.check) x = 1;
    }

    return x;
  }

  let arr = new Array();
  function rcList() {
    let count = 0;

    for (let item of dataList.courses) {
      if (search(item.check) == 0 && count < 3) {
        ++count;
        console.log(item);
        arr.push(item);
      }
    }
  }

  console.log(arr);

  function showM() {
    setShowModal(true);
    setCart((temp) => []);
  }

  return (
    <div className="main-container">
      <Dashboard message1="" message2="Shopping Cart" />
      <div className="shoppin-Cart-Area">
        <div className="shopping-CardCourseArea">
          <h3>{cart.length} courses are added</h3>
          {cart.map((item, index) => (
            <CardcheckoutTemplate
              name={item.name}
              price={item.price}
              check={item.check}
              key={index}
            />
          ))}

          <div className="Recommend-course">
            <h3 style={{ marginBottom: "4px" }}>Recommended Courses</h3>
            {rcList()}
            {arr.map((item, index) => {
              return <CourseCard courseData={item} key={index} />;
            })}
          </div>
        </div>

        <div className="shopping-CardCartArea">
          <p
            style={{
              marginRight: "25px",
              fontSize: "medium",
            }}
          >
            Total Amount
          </p>
          <h1>Rs {addPrice()}/-</h1>
          <button onClick={showM}>Checkout</button>
        </div>
      </div>

      {showModal ? (
        <ModalMain
          message="You successfully placed your order"
          showModal={setShowModal}
        />
      ) : null}
    </div>
  );
}
