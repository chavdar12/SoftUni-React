import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the import path as needed
import { Product } from "#types"; // Adjust the import path as needed

const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCol = collection(db, "Product");
        const q = query(productsCol);
        const querySnapshot = await getDocs(q);

        const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};

export default useGetProducts;
