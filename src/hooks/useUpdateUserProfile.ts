import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "#types";
import { useAuth } from "#utils";
const useUpdateUserProfile = () => {
  const { user } = useAuth();

  const updateUserProfile = async (data: Partial<User>) => {
    if (user) {
      const userProfileRef = doc(db, "UserProfile", user.uid);
      try {
        await setDoc(
          userProfileRef,
          { ...data, user_id: user.uid },
          { merge: true }
        );
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    } else {
      console.error("No authenticated user found.");
    }
  };

  return updateUserProfile;
};

export default useUpdateUserProfile;
