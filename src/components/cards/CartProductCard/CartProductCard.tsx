import { QuantityButton } from "#components";
import { Product } from "#types";
import "./cart-product-card.scss";
interface CartProductCardProps {
  classes?: string;
  item: Product;
  quantity?: number;
  setQuantity?: (newQuantity: number) => void;
  t: (key: string) => string;
  isCheckout?: boolean;
}

function CartProductCard({
  classes,
  item,
  quantity,
  setQuantity,
  t,
  isCheckout = false,
}: CartProductCardProps) {
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
          <p className="cart-product-card__price">
            {t("price")}
            {": "}
            {item.price}
          </p>
          {isCheckout && (
            <p className="cart-product-card__quantity">
              {t("quantity")}
              {": "}
              {quantity}
            </p>
          )}
        </div>
        {!isCheckout && (
          <div className="cart-product-card__wrapper__quantity">
            <QuantityButton quantity={quantity} setQuantity={setQuantity} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CartProductCard;
