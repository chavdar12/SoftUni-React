import {
  Block,
  Box,
  Button,
  Carousel,
  Grid,
  GridItem,
  QuantityButton,
} from "#components";
import { useGetProductById } from "#hooks";
import { useParams } from "react-router-dom";
import "./product-block.scss";
import { useCart } from "#utils";
import { useState } from "react";

function ProductBlock() {
  const params = useParams();
  const productId = decodeURIComponent(params.productId!);
  const { product, loading } = useGetProductById(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  return (
    <Block classes="product-block">
      <Grid>
        {loading ? (
          <p>Loading</p>
        ) : (
          <GridItem md={8} lg={12}>
            <Box>
              <Grid>
                <GridItem md={6} lg={12}>
                  <Carousel
                    classes="product-block__carousel"
                    itemsToDisplay={[1, 1, 1, 1]}
                    showDots={false}
                  >
                    {product?.photos?.map((photo) => (
                      <img
                        key={photo}
                        className="product-block__photo"
                        src={photo}
                        alt={product.name}
                      />
                    ))}
                  </Carousel>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <h1>{product?.name}</h1>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <h1>{product?.price}</h1>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <h1>{product?.category}</h1>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <h1>{product?.description}</h1>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <QuantityButton
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <Button text="Add to cart" onClick={handleAddToCart} />
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        )}
      </Grid>
    </Block>
  );
}

export default ProductBlock;
