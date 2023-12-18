import "./cart-block.scss";

import {
  Block,
  Box,
  Button,
  CartProductCard,
  Grid,
  GridItem,
} from "#components";
import { useCart } from "#utils";

function CartBlock() {
  const { items } = useCart();
  return (
    <Block classes="cart-block">
      <Grid>
        <GridItem md={6} lg={8}>
          <Box>
            <Grid>
              {items.map((item) => (
                <GridItem md={8} lg={12} key={item.product.id}>
                  <CartProductCard item={item.product} />
                </GridItem>
              ))}
              <GridItem md={8} lg={12} classes="cart-block__button">
                <Button text="Checkout" />
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
        <GridItem md={2} lg={4}>
          <Box>
            <GridItem md={8} lg={12}>
              <div>
                <h2>Subtotal</h2>
                <p>Price</p>
              </div>
            </GridItem>
          </Box>
        </GridItem>
      </Grid>
    </Block>
  );
}

export default CartBlock;
