import { useGetProducts } from "#hooks";

function LandingBlock() {
  const { products, loading } = useGetProducts();

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default LandingBlock;
