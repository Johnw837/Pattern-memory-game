// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfC4xd3T9fZu5uLNSblI0Ak1TbBD6psLg",
  authDomain: "pattern-memory-game.firebaseapp.com",
  projectId: "pattern-memory-game",
  storageBucket: "pattern-memory-game.firebasestorage.app",
  messagingSenderId: "832396212045",
  appId: "1:832396212045:web:827e951402ae97fd426904",
  measurementId: "G-KEY2P5BFSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
