import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvV8A5lTB3HNgRFT0CDjuUM3FWckE3Zbg",
  authDomain: "project-management-e15fe.firebaseapp.com",
  projectId: "project-management-e15fe",
  storageBucket: "project-management-e15fe.appspot.com",
  messagingSenderId: "904658628920",
  appId: "1:904658628920:web:5142ccb93f73d0b17d11cd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, setDoc, doc };
