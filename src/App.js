import React, { useState } from "react";
import "./styles.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

export default function App() {
  const [IsShowCart, showCart] = useState(false);

  const showCartModal = () => {
    showCart(true);
  };

  const hideCartModal = () => {
    showCart(false);
  };

  return (
    <CartProvider>
      {IsShowCart && <Cart Onclose={hideCartModal} />}
      <Header onShowCart={showCartModal} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}
