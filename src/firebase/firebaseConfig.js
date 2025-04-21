import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getStorage } from "firebase/storage"; // For Firebase Storage


const firebaseConfig = {
  apiKey: "AIzaSyBQXa9B22A-I56_WIwcsE_zBb7UXHl-0DU",
  authDomain: "final-voting-system-1adee.firebaseapp.com",
  projectId: "final-voting-system-1adee",
  storageBucket: "final-voting-system-1adee.firebasestorage.app",
  messagingSenderId: "1045020801698",
  appId: "1:1045020801698:web:c77c4add1d347769e275fb"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // For Authentication
const db = getFirestore(app); // For Firestore
const storage = getStorage(app); // For Firebase Storage

export { auth, db, storage };