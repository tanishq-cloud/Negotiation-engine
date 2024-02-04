
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBWbF4gsy6eBJUGdWgAVbAwOXv3_-A2rTI",
    authDomain: "negotiation-engine.firebaseapp.com",
    projectId: "negotiation-engine",
    storageBucket: "negotiation-engine.appspot.com",
    messagingSenderId: "732649527029",
    appId: "1:732649527029:web:f0a28d22c9e43ac4a917bc",
    measurementId: "G-3QEHR01RYX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);