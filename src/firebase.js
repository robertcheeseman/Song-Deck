import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: 'AIzaSyBfNU_FofULyVVu0h6TBgg7566eFBaVt9A',
  authDomain: "songdeck-aef50.firebaseapp.com",
  projectId: "songdeck-aef50",
  storageBucket: "songdeck-aef50.appspot.com",
  messagingSenderId: "323627691246",
  appId: "1:323627691246:web:c21e943a2436ef91bed7ff"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
