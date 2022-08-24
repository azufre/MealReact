import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCxt = useContext(CartContext);

  const [IsItemChanged, SetItemChanged] = useState(false);

  const { items } = cartCxt;

  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${IsItemChanged ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    SetItemChanged(true);

    const timer = setTimeout(() => {
      SetItemChanged(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
