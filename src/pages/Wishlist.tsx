//Importing all the important libraries

import React, { useContext, useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Dashboard from "../components/Dashboard";
import { CartWishListProvider, CartWishList } from "./CartWishList";
import { CartProvider, CartContext } from "./CartContext";
import Pagination from "../Pagination";
import CartItem from "../components/CartItem";
import * as data from "../mock.json";
import WishlistCard from "../components/WishlistCard";

//Making a type like a protype to the single item thing in mock.json file
type Item = {
  name: string;
  author: string;
  price: number;
  discount: number;
  check: number;
  tags: string[];
};

export default function Wishlist() {
  const [wishList, setWishList] = useContext(CartWishList);             // Simply using the state WishList through useContext Hook
  const [cart, setCart] = useContext(CartContext);                      // Simply using the state cart through useContext Hook
  let [courseList, setCourseList] = useState(data.courses);             //  Using state for sorting
  let [searchTerm, setSearchTerm] = useState(" ");                      //  Using state for searching
  let [total, setTotal] = useState(0);                                  //  Using state for totaling of prices

  const [coursePerPage, setCoursePerPage] = useState(5);                // to set no. of cards on one page
  const [page, setPage] = useState({                                    // for pagination
    start: 0,
    end: coursePerPage,
  });

  useEffect(() => {                                                     // show the change in total Price
    totalPrice();
  });

  function totalPrice() {                                               // Giving the calculated price
    let add = 0;
    for (let i = 0; i < cart.length; i++) {
      add += cart[i].price - (cart[i].price * cart[i].discount) / 100;
    }
    total = add;
    console.log(cart.length);
    setTotal(total);
    
  }
  function onPageChange(start, end) {                                   // To change the cards on pages
    setPage({ start: start, end: end });
  }

  function compareByAsc(a, b) {                                         // comparison for ascending order
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }

  function compareByDesc(a, b) {                                        // comparison for descending order
    if (a.price < b.price) {
      return 1;
    }
    if (a.price > b.price) {
      return -1;
    }
    return 0;
  }

  function sortByAsc() {                                                // sorting by ascending order
    setCourseList([...courseList].sort(compareByAsc));
  }

  function sortByDesc() {

    setCourseList([...courseList].sort(compareByDesc));                 // sorting by descending order
    
  }

  return (
    <div className="main-container">
      <Dashboard message1="" message2="Wishlist" />                     

      <div className="CardArea">
        <div className="CardCourseArea">
          <div className="CardCourseAreaTop">
            <p>
              <strong style={{ fontSize: "xx-large" }}>My Wishlist</strong>
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
            {wishList
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
                <WishlistCard courseData={course} key={index} />                   
              ))}
          </div>
          <Pagination
            coursePerPage={coursePerPage}
            onPageChange={onPageChange}
          />
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
    </div>
  );
}
