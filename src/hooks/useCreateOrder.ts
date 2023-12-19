import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CartItem } from "#utils";

const useCreateOrder = () => {
  const createOrder = async (userId: string, cartItems: CartItem[]) => {
    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      await addDoc(collection(db, "Orders"), {
        userId,
        items: orderItems,
        status: "pending",
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error creating order: ", error);
    }
  };

  return createOrder;
};

export default useCreateOrder;