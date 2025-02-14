// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3pLaLTm16PD2U_GN3oiey0rm_Civvzo4",
  authDomain: "coding-website-59da5.firebaseapp.com",
  projectId: "coding-website-59da5",
  storageBucket: "coding-website-59da5.firebasestorage.app",
  messagingSenderId: "378151871504",
  appId: "1:378151871504:web:682829d96be887b7541695",
  measurementId: "G-Z1HLXXCE1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)
export default app;