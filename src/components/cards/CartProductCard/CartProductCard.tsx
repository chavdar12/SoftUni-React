import { QuantityButton } from "#components";
import { Product } from "#types";
import { useCart } from "#utils";

import "./cart-product-card.scss";
interface CartProductCardProps {
  classes?: string;
  item: Product;
}

function CartProductCard({ classes, item }: CartProductCardProps) {
  const { items } = useCart();

  const [quantity, setQuantity] = [1, () => {}];

  return (
    <div className={["cart-product-card", classes].join(" ")}>
      <div className="cart-product-card__wrapper">
        <img
          className="cart-product-card__wrapper__image"
          src={item.photos![0]}
          alt={item.name}
        />
        <div className="cart-product-card__wrapper__content">
          <h2 className="cart-product-card__name">{item.name}</h2>
          <p className="cart-product-card__price">{item.price}</p>
        </div>
        <div className="cart-product-card__wrapper__quantity">
          <QuantityButton
            quantity={parseInt(item.quantity)}
            setQuantity={setQuantity}
          />
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
