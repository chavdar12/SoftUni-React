import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "#types";

const useGetUserProfile = (userId: string) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfileCol = collection(db, "UserProfile");
      const q = query(userProfileCol, where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as User),
      }));

      setUserProfile(results.length > 0 ? results[0] : null);
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  return userProfile;
};

export default useGetUserProfile;
