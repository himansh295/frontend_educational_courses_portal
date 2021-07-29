import React, { useState, useEffect, useContext } from "react";
// import "./App.css";
import CardCartArea from "./CartItem";
import * as data from "../mock.json";
import CourseCard from "./CourseCard";
import SearchIcon from "./images/Group35.svg";
import CartItem from "./CartItem";
import Pagination from "../Pagination";
import { isTemplateExpression } from "typescript";
import { CartContext } from "../pages/CartContext";

type Item = {
  name: string;
  author: string;
  price: number;
  discount: number;
  check: number;
  tags: string[];
};

export default function CardArea() {
  const [cart, setCart] = useContext(CartContext);                  //  Simply using the state WishList through useContext Hook

  let [courseList, setCourseList] = useState(data.courses);         //  Using state for sorting
  let [total, setTotal] = useState(0);                              //  Using state for totaling
  let [searchTerm, setSearchTerm] = useState(" ");                  //  Using state for searching

  const [coursePerPage, setCoursePerPage] = useState(5);            //  to set no. of cards on one page
  const [page, setPage] = useState({                                //  for pagination
    start: 0,
    end: coursePerPage,
  });

  function onPageChange(start, end) {
    setPage({ start: start, end: end });
  }

  useEffect(() => {
    totalPrice();
  });

  function totalPrice() {
    let add = 0;
    for (let i = 0; i < cart.length; i++) {
      add += cart[i].price - (cart[i].price * cart[i].discount) / 100;
    }
    total = add;
    console.log(cart.length);
    setTotal(total);
    
  }

  function compareByAsc(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }

  function compareByDesc(a, b) {
    if (a.price < b.price) {
      return 1;
    }
    if (a.price > b.price) {
      return -1;
    }
    return 0;
  }

  function sortByAsc() {
    setCourseList([...courseList].sort(compareByAsc));
  }

  function sortByDesc() {
    
    setCourseList([...courseList].sort(compareByDesc));
    
  }

  return (
    <div className="CardArea">
      <div className="CardCourseArea">
        <div className="CardCourseAreaTop">
          <p>
            <strong style={{ fontSize: "xx-large" }}>All Courses</strong>
          </p>
          <div className="dropdown">
            <button className="dropbtn">Course Price</button>
            <div className="dropdown-content">
              <button onClick={sortByAsc}>Low to High</button>
              <button onClick={sortByDesc}>Hight to Low</button>
            </div>
          </div>
        </div>
        <div className="CardCourseAreaList">
          {courseList
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val.author.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .slice(page.start, page.end)
            .map((course, index) => (
              <CourseCard courseData={course} key={index} />
            ))}
        </div>
        <Pagination coursePerPage={coursePerPage} onPageChange={onPageChange} />
      </div>
      <div className="CardCartArea">
        <div>
          <div className="CardSearchContainer">
            <input
              type="text"
              placeholder="Course Search.."
              name="search"
              style={{
                marginTop: "1.2em",
                width: "40em",
                height: "3em",
                marginBottom: "1em",
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="CardCartBox">
            <div className="CardCartBoxHeader">
              <h2 style={{ textAlign: "center" }}>YOUR CART DETAILS</h2>
              <hr style={{ marginLeft: "2px", marginRight: "2px" }} />
            </div>

            <div className="CardCartBoxItems">
              {cart.map((item: Item) => (
                <CartItem
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                />
              ))}
            </div>

            <div className="CardCartBoxTotalPrice">
              <div>
                <p>Total Price</p>
                <p>
                  
                  <strong>Rs. {total} /-</strong>
                </p>
              </div>
              <div
                style={{
                  marginTop: "1em",
                  marginRight: "2em",
                  color: "#FF6738",
                  fontSize: "x-large",
                }}
              >
                Go To Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
