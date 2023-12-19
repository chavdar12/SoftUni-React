import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CartItem } from "#utils";

const useUpdateProductQuantities = () => {
  const updateQuantities = async (cartItems: CartItem[]) => {
    try {
      const updates = cartItems.map((item) => {
        if (item.product.id && item.product.quantity >= item.quantity) {
          const productRef = doc(db, "Product", item.product.id as string);
          return updateDoc(productRef, {
            quantity: item.product.quantity - item.quantity,
          });
        } else {
          console.error(
            "Invalid product data or insufficient stock for product:",
            item.product.id
          );
          return Promise.resolve();
        }
      });

      await Promise.all(updates);
    } catch (error) {
      console.error("Error updating product quantities: ", error);
    }
  };

  return updateQuantities;
};

export default useUpdateProductQuantities;
