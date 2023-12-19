import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { UserProfile } from "#types";
import { db } from "../firebase";
import { useAuth } from "#utils";

const useUserRole = () => {
  const [role, setRole] = useState<UserProfile["role"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      console.log(user);

      if (user) {
        try {
          const userProfileRef = doc(db, "UserProfile", user.uid);
          const userProfileSnap = await getDoc(userProfileRef);

          if (userProfileSnap.exists()) {
            const userProfile = userProfileSnap.data() as UserProfile;
            setRole(userProfile.role);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { role, loading };
};

export default useUserRole;
