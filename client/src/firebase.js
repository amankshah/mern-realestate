//import data from env

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-77edd.firebaseapp.com",
  projectId: "real-estate-77edd",
  storageBucket: "real-estate-77edd.appspot.com",
  messagingSenderId: "805984986537",
  appId: "1:805984986537:web:5c0bbaf666f3c7834ed0b8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
