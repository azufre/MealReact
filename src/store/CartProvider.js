import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultReduceState = {
  items: [],
  totalAmount: 0,
};

const cartReduce = (state, action) => {
  if (action.type === "ADD") {
    const existItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existItemCart = state.items[existItemIndex];

    let UpdateItems;

    if (existItemCart) {
      const UpdateItem = {
        ...existItemCart,
        amount: existItemCart.amount + action.item.amount,
      };

      UpdateItems = [...state.items];
      UpdateItems[existItemIndex] = UpdateItem;
    } else {
      UpdateItems = state.items.concat(action.item);
    }

    const items = UpdateItems;
    const totalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return {
      items,
      totalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItem = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItem];
    const updateTotalAmount = state.totalAmount - existingItem.price;

    let updateItems;

    if (existingItem.amount === 1) {
      updateItems = state.items.filter((q) => q.id !== action.id);
    } else {
      const current_item = { ...existingItem, amount: existingItem.amount - 1 };
      updateItems = [...state.items];
      updateItems[existingCartItem] = current_item;
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultReduceState;
  }

  return defaultReduceState;
};

const CartProvider = (props) => {
  const [stateCart, dispathCartAction] = useReducer(
    cartReduce,
    defaultReduceState
  );

  const AddItem = (item) => {
    dispathCartAction({
      type: "ADD",
      item: item,
    });
  };

  const RemoveItem = (id) => {
    dispathCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const ClearCart = () => {
    dispathCartAction({
      type: "CLEAR",
    });
  };

  const cartContext = {
    items: stateCart.items,
    totalAmount: stateCart.totalAmount,
    AddItem: AddItem,
    RemoveItem: RemoveItem,
    ClearCart: ClearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
