// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKoKISGjRDxbnp1a4om3E460ej2lLXOxE",
  authDomain: "mern-totalfitness.firebaseapp.com",
  projectId: "mern-totalfitness",
  storageBucket: "mern-totalfitness.appspot.com",
  messagingSenderId: "798774013146",
  appId: "1:798774013146:web:3957ddace57e4bec0e49e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app)