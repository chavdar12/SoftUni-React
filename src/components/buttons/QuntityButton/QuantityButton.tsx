import "./quantity-button.scss";

interface QuantityButtonProps {
  classes?: string;
  quantity?: number;
  setQuantity?: (quantity: number) => void;
}
function QuantityButton({
  classes,
  quantity = 1,
  setQuantity = () => {},
}: QuantityButtonProps) {
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(Math.max(1, quantity - 1));

  return (
    <div className={["quantity-button", classes].join(" ")}>
      <button onClick={decrement} className="quantity-button__control">
        -
      </button>
      <span className="quantity-button__value">{quantity}</span>
      <button onClick={increment} className="quantity-button__control">
        +
      </button>
    </div>
  );
}

export default QuantityButton;
