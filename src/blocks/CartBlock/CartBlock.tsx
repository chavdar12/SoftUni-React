import "./cart-block.scss";

import {
  Block,
  Box,
  Button,
  CartProductCard,
  Grid,
  GridItem,
} from "#components";
import { CartItem, useCart } from "#utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type CartQuantities = {
  [productId: string]: number;
};

function CartBlock() {
  const { t } = useTranslation("cart-block");
  const { items, updateItemQuantity } = useCart();
  const [quantities, setQuantities] = useState<CartQuantities>({});
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuantities: CartQuantities = {};
    items.forEach((item: CartItem) => {
      if (item.product && item.product.id) {
        initialQuantities[item.product.id] = item.quantity;
      }
    });
    setQuantities(initialQuantities);
  }, [items]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (productId) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
      updateItemQuantity(productId, newQuantity);
    }
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      if (item.product && item.product.id) {
        const price = item.product.price;
        totalPrice += price * (quantities[item.product.id] ?? 0);
      }
    });
    return totalPrice;
  };

  return (
    <Block classes="cart-block">
      <Grid>
        <GridItem md={6} lg={8}>
          <Box heading={t("products")}>
            <Grid>
              {items.map(
                (item) =>
                  item.product &&
                  item.product.id && (
                    <GridItem md={8} lg={12} key={item.product.id}>
                      <CartProductCard
                        t={t}
                        item={item.product}
                        quantity={quantities[item.product.id] ?? 0}
                        setQuantity={(newQuantity: number) =>
                          updateQuantity(item.product.id!, newQuantity)
                        }
                      />
                    </GridItem>
                  )
              )}
              <GridItem md={8} lg={12} classes="cart-block__button">
                <Button
                  text={t("checkout")}
                  onClick={() => navigate("/checkout")}
                />
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
        <GridItem md={2} lg={4}>
          <Box>
            <GridItem md={8} lg={12}>
              <div>
                <h1>{t("subtotal")}</h1>
                <p>{t("price")}</p>
                {calculateTotalPrice()}
              </div>
            </GridItem>
          </Box>
        </GridItem>
      </Grid>
    </Block>
  );
}

export default CartBlock;
