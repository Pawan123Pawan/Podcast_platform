// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIgK5csJINYwqHCZJiE6R9qcJW_mGMOvg",
  authDomain: "podcast-platform-6d612.firebaseapp.com",
  projectId: "podcast-platform-6d612",
  storageBucket: "podcast-platform-6d612.appspot.com",
  messagingSenderId: "1039656272072",
  appId: "1:1039656272072:web:08f937339997405e8725fd",
  measurementId: "G-T8ND6MT3V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const store = getStorage(app);
const auth = getAuth(app);


export {auth, db, store};