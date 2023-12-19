import {
  Block,
  Box,
  Button,
  Carousel,
  Grid,
  GridItem,
  QuantityButton,
} from "#components";
import { useGetCategories, useGetProductById } from "#hooks";
import { useParams } from "react-router-dom";
import "./product-block.scss";
import { useCart } from "#utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ProductBlock() {
  const { t } = useTranslation("product-block");
  const params = useParams();
  const productId = decodeURIComponent(params.productId!);
  const { product, loading } = useGetProductById(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const { categories } = useGetCategories();

  const categoryName = product
    ? categories.find((c) => c.key === product.category)?.name
    : null;

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
                <GridItem md={4} lg={12} classes={"product-block__item"}>
                  <h1 className="product-block__title">{product?.name}</h1>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <Box heading={t("price")}>
                    <p>{product?.price}</p>
                  </Box>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <Box heading={t("category")}>
                    <p>{categoryName}</p>
                  </Box>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <Box heading={t("description")}>
                    <p>{product?.description}</p>
                  </Box>
                </GridItem>
                <GridItem md={4} lg={12}>
                  <Box heading={t("quantity")}>
                    <p>{product?.quantity}</p>
                  </Box>
                </GridItem>
                <GridItem md={4} lg={12} classes="product-block__footer">
                  <QuantityButton
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <Button text={t("add_cart")} onClick={handleAddToCart} />
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
