import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import dotenv from "dotenv";
setLogLevel("debug");

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyA40hzo5OJ7JsAXBIhtoIzyTt2FP4KVHiE",
  authDomain: "task-management-app-8c236.firebaseapp.com",
  projectId: "task-management-app-8c236",
  storageBucket: "task-management-app-8c236.firebasestorage.app",
  messagingSenderId: "743623677714",
  appId: "1:743623677714:web:48b5a0360722ddaae2c5cb",
  measurementId: "G-K341EPHJGL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
