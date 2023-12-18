import { Block, Grid, GridItem, ProductCard } from "#components";
import { useGetProducts } from "#hooks";
import { useNavigate } from "react-router-dom";

function LandingBlock() {
  const { products, loading } = useGetProducts();
  const navigate = useNavigate();

  return (
    <Block classes="landing-block">
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <Grid>
          {products.map((product) => (
            <GridItem
              md={3}
              lg={4}
              key={product.id}
              onClick={() => {
                navigate(`/product/${encodeURIComponent(product.id!)}`);
              }}
            >
              <ProductCard key={product.user_id} product={product} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Block>
  );
}

export default LandingBlock;
