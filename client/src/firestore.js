import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHaarIBT9DxbCIDTIhaLDUXUnjPxZCqJE",
  authDomain: "wingman-b2716.firebaseapp.com",
  projectId: "wingman-b2716",
  storageBucket: "wingman-b2716.appspot.com",
  messagingSenderId: "534375654676",
  appId: "1:534375654676:web:616c5eb234fceb95150e01"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
