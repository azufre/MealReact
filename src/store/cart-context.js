import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  AddItem: (item) => {},
  RemoveItem: (id) => {},
  ClearCart: () => {}
});

export default CartContext;
