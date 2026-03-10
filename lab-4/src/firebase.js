import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDs19fWZrsDMeS7MbkzEvml5Av1CKa7OyY",
    authDomain: "car-rent-lab4.firebaseapp.com",
    projectId: "car-rent-lab4",
    storageBucket: "car-rent-lab4.firebasestorage.app",
    messagingSenderId: "16230396366",
    appId: "1:16230396366:web:891161826588dbe525fb9f"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);