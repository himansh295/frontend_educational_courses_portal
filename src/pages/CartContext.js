import React, { createContext, useState } from "react";



export const CartContext = createContext();             // Creating Context for easier use of particular state in multiple files

export const CartProvider = (props) => {                // It will make this value available to all of its children, and their childrens
  
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
