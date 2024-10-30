import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAhw5oQI0NIBJ_yPxOERBbL0Azswv30zNs",
  authDomain: "notion-f8cb0.firebaseapp.com",
  projectId: "notion-f8cb0",
  storageBucket: "notion-f8cb0.appspot.com",
  messagingSenderId: "370870843536",
  appId: "1:370870843536:web:cbddaa35f4dad261e88015",
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export { db };
