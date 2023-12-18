// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwqx5v1hlYL0C1VAl18hvKewVgfWNSCv8",
  authDomain: "softuni-react-9f1d2.firebaseapp.com",
  projectId: "softuni-react-9f1d2",
  storageBucket: "softuni-react-9f1d2.appspot.com",
  messagingSenderId: "463394187730",
  appId: "1:463394187730:web:5f1f5968faf891906dc00b",
  measurementId: "G-23246P735F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
