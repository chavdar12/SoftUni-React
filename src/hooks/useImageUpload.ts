import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, userId: string) => {
    if (!file || !userId) return "";

    const imageRef = ref(storage, `profile/${userId}/${file.name}`);
    setUploading(true);

    try {
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading file", error);
      return "";
    } finally {
      setUploading(false);
    }
  };

  return { uploading, uploadImage };
};

export default useImageUpload;
