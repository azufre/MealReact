import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  AddItem: (item) => {},
  RemoveItem: (id) => {}
});

export default CartContext;
