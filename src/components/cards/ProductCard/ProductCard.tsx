import { Button, Carousel, Grid, GridItem } from "#components";
import { Product } from "#types";
import "./product-card.scss";

interface ProductProps {
  product: Product;
  classes?: string;
}

function ProductCard({ product, classes }: ProductProps) {
  console.log(product.id);

  return (
    <div className={["product-card", classes].join(" ")}>
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
          <h2 className="product-card__name">{product.name}</h2>
        </GridItem>
        <GridItem md={8} lg={12}>
          <h4 className="product-card__price">{product.price}</h4>
        </GridItem>
        <GridItem md={8} lg={12}>
          <p className="product-card__description">{product.description}</p>
        </GridItem>
        <GridItem md={8} lg={12} classes="product-card__button">
          <Button
            text="More info"
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
