// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHNXpVfiYXAJ-WQk3x44PlhPZnVmLHc4g",
  authDomain: "movie-sphere-7470b.firebaseapp.com",
  projectId: "movie-sphere-7470b",
  storageBucket: "movie-sphere-7470b.appspot.com",
  messagingSenderId: "452165244381",
  appId: "1:452165244381:web:35332ddae472b38f56d234",
  measurementId: "G-9R38LM176K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
