import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Product } from "#types";

const fetchProducts = async (): Promise<Product[]> => {
  const productsCol = collection(db, "Product");
  const q = query(productsCol);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...(doc.data() as Product),
  }));
};

function LandingBlock() {
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);
  

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

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
