import { Box, Button, Carousel, Grid, GridItem } from "#components";
import { Product } from "#types";
import "./product-card.scss";

interface ProductProps {
  product: Product;
  classes?: string;
  onClick?: () => void;
  t: (text: string) => string;
}

function ProductCard({ product, classes, onClick, t }: ProductProps) {
  return (
    <div className={["product-card", classes].join(" ")} onClick={onClick}>
      <Grid>
        <GridItem md={8} lg={12}>
          <Carousel
            classes="product-card__carousel"
            itemsToDisplay={[1, 1, 1, 1]}
            showDots={false}
          >
            {product.photos?.map((photo) => (
              <img
                key={photo}
                className="product-card__photo"
                src={photo}
                alt={product.name}
              />
            ))}
          </Carousel>
        </GridItem>
        <GridItem md={8} lg={12}>
          <h1 className="product-card__name">{product.name}</h1>
        </GridItem>
        <GridItem md={8} lg={12}>
          <div className="product-card__price">
            <p className="product-card__price__heading">{t("price")}</p>
            <p>{product.price}</p>
          </div>
        </GridItem>
        <GridItem md={8} lg={12}>
          <div className="product-card__description">
            <p className="product-card__description__heading">
              {t("description")}
            </p>
            <p>{product?.description}</p>
          </div>
        </GridItem>
        <GridItem md={8} lg={12} classes="product-card__button">
          <Button
            text={t("more_info")}
            classes="product-card__button"
            onClick={() => {
              console.log("clicked");
            }}
          />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ProductCard;
