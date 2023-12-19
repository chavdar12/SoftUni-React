import { useState } from "react";
import {
  collection,
  query,
  getDocs,
  limit,
  startAfter,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "#types";

const usePaginatedUserProfiles = (itemsPerPage = 20) => {
  const [userProfiles, setUserProfiles] = useState<User[]>([]);
  console.log(userProfiles);

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfiles = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "UserProfile"),
        orderBy("user_id"),
        limit(itemsPerPage),
        ...(lastDoc ? [startAfter(lastDoc)] : [])
      );

      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);

      const fetchedProfiles = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          first_name: data.first_name,
          last_name: data.last_name,
          user_id: data.user_id,
          address: data.address || "",
          birthdate: data.birthdate || "",
          phone_number: data.phone_number || "",
          photo_url: data.photo_url || "",
          city: data.city || "",
        } as User;
      });

      setUserProfiles((prevProfiles) => [...prevProfiles, ...fetchedProfiles]);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  return { userProfiles, fetchUserProfiles, loading };
};

export default usePaginatedUserProfiles;
