"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  return (
    <CartContext.Provider value={{ cart, setCart, openCart, setOpenCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
