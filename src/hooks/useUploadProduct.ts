import { useState } from "react";
import { db, storage } from "../firebase"; // Adjust the import path as needed
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from "#types"; 

interface UploadResult {
  error: Error | null;
  isUploading: boolean;
}

const useUploadProduct = () => {
  const [uploadResult, setUploadResult] = useState<UploadResult>({
    error: null,
    isUploading: false,
  });

  const uploadProduct = async (
    productData: Product,
    images: File[]
  ): Promise<void> => {
    setUploadResult({ ...uploadResult, isUploading: true });

    try {
      const imageUrls: string[] = await Promise.all(
        images.map(async (image) => {
          const uniqueName = `images/${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 9)}`;
          const imageRef = ref(storage, uniqueName);
          const snapshot = await uploadBytes(imageRef, image);
          return getDownloadURL(snapshot.ref);
        })
      );

      // Add product to Firestore with image URLs
      await addDoc(collection(db, "Product"), {
        ...productData,
        photos: imageUrls,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setUploadResult({ ...uploadResult, error: null });
    } catch (error) {
      if (error instanceof Error) {
        setUploadResult({ ...uploadResult, error });
      }
    } finally {
      setUploadResult({ ...uploadResult, isUploading: false });
    }
  };

  return { uploadProduct, ...uploadResult };
};

export default useUploadProduct;
