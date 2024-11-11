// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBrSSBeqg5nUO7eBjND_rX16K5V-9Y_g40",
    authDomain: "system-finance.firebaseapp.com",
    projectId: "system-finance",
    storageBucket: "system-finance.appspot.com",
    messagingSenderId: "7693015230",
    appId: "1:7693015230:web:0bfc33c2b3f37f9b1fe6ef"
  };

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();
const firestore = app.firestore();

export { auth, firestore };
