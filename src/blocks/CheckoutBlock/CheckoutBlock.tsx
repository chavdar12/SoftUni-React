import {
  Block,
  Box,
  Button,
  CartProductCard,
  Grid,
  GridItem,
} from "#components";
import { useAuth, useCart } from "#utils";
import { useTranslation } from "react-i18next";
import "./checkout-block.scss";
import { useCreateOrder, useUpdateProductQuantities } from "#hooks";

function CheckoutBlock() {
  const { items } = useCart();
  const { t } = useTranslation("checkout-block");
  const updateQuantities = useUpdateProductQuantities();
  const createOrder = useCreateOrder();
  const { user } = useAuth();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      if (item.product && item.product.id) {
        const price = item.product.price;
        totalPrice += price * item.quantity;
      }
    });
    return totalPrice;
  };

  const handleCheckout = async () => {
    await updateQuantities(items);
    await createOrder(user?.uid, items);
  };

  return (
    <Block classes="checkout-block">
      <Grid>
        <GridItem md={8} lg={12}>
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
                        isCheckout={true}
                      />
                    </GridItem>
                  )
              )}
              <GridItem md={8} lg={12} classes="checkout-block__button">
                <h2 className="checkout-block__total-price">
                  {t("total_price")}
                  {": "}
                  {calculateTotalPrice()}
                </h2>

                <Button
                  text={t("checkout")}
                  onClick={() => {
                    handleCheckout();
                  }}
                />
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </Block>
  );
}

export default CheckoutBlock;
