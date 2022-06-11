import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMjpQqYBEHSmX-DPInXLvJCQ7zci1XGOE",
  authDomain: "oschat-882ed.firebaseapp.com",
  databaseURL:
    "https://oschat-882ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "oschat-882ed",
  storageBucket: "oschat-882ed.appspot.com",
  messagingSenderId: "619845400177",
  appId: "1:619845400177:web:866ff2c6260ce6cd36cdd0",
  measurementId: "G-HWKCFD4XJL",
};

const app = initializeApp(firebaseConfig);
// const analytics=  app.analytics();

export const auth = getAuth(app);
export const db = getFirestore(app);
