import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const TotalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const onRemoveHandler = (id) => {
    cartCtx.RemoveItem(id);
  };

  const onAddHandler = (item) => {
    cartCtx.AddItem({
      ...item,
      amount: 1
    });
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={onRemoveHandler.bind(null, item.id)}
      onAdd={onAddHandler.bind(null, item)}
    />
  ));

  return (
    <Modal onClose={props.Onclose}>
      <ul className={classes.cart_items}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amoun</span>
        <span>{TotalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.Onclose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
