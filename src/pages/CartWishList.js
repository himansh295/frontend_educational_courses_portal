import React, { createContext, useState } from "react";

export const CartWishList = createContext(); // Creating Context for easier use of particular state in multiple files

export const CartWishListProvider = (props) => {
  // It will make this value available to all of its children, and their childrens
  const [wishList, setWishList] = useState([]);

  return (
    <CartWishList.Provider value={[wishList, setWishList]}>
      {props.children}
    </CartWishList.Provider>
  );
};
