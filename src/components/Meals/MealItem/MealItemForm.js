import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountValid] = useState(true);

  const handlerSubmit = (event) => {
    event.preventDefault();

    const amountValue = amountInputRef.current.value;
    const amountNumber = +amountValue;

    if (
      amountValue.trim().length === 0 ||
      amountNumber < 1 ||
      amountNumber > 5
    ) {
      setAmountValid(false);
      return;
    }

    props.onAddtoCart(amountNumber);
  };

  return (
    <form className={classes.form} onSubmit={handlerSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1"
        }}
      />
      <button>+ add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
