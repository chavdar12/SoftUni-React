import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const useGetCategories = () => {
  const [categories, setCategories] = useState<{ key: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const colRef = collection(db, "Categories");
        const querySnapshot = await getDocs(colRef);

        const fetchedCategories = querySnapshot.docs.flatMap((doc) => {
          const categoryObject = doc.data().type;
          return Object.entries(categoryObject).map(([key, value]) => ({
            key,
            name: value as string,
          }));
        });

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};

export default useGetCategories;
