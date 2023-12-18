import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "#types";

const useUpdateUserProfile = () => {
  const updateUserProfile = async (userId: string, data: Partial<User>) => {
    const userProfileRef = doc(db, "UserProfile", userId);
    await updateDoc(userProfileRef, data);
  };

  return updateUserProfile;
};

export default useUpdateUserProfile;
