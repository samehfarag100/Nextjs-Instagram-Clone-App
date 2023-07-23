// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQV68XUYb-EItstV2L8CaCef6d0B5kyzY",
  authDomain: "next-instagram-app.firebaseapp.com",
  projectId: "next-instagram-app",
  storageBucket: "next-instagram-app.appspot.com",
  messagingSenderId: "449413231509",
  appId: "1:449413231509:web:74ea41f4638c5b0b777c9c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
