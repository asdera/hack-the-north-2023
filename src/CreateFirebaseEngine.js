// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD242krmNu_xIHXzz4xU2D0RVpQwr1Qcuw",
    authDomain: "chess-with-guns.firebaseapp.com",
    projectId: "chess-with-guns",
    storageBucket: "chess-with-guns.appspot.com",
    messagingSenderId: "1078893807658",
    appId: "1:1078893807658:web:c446b6fec37c1ba0469b53",
    measurementId: "G-734GRJ68XP"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase_app);
// const firebase_analytics = getAnalytics(firebase_app);
const cloud_functions = getFunctions(firebase_app);
export const registerUser = httpsCallable(cloud_functions, "registerUser");

export default firebase_app;