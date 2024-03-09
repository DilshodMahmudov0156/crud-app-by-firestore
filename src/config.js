import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdwj0neqoLsIYUi5aG2B86HuPeZDV45IM",
    authDomain: "my-first-firestore-3485d.firebaseapp.com",
    projectId: "my-first-firestore-3485d",
    storageBucket: "my-first-firestore-3485d.appspot.com",
    messagingSenderId: "426691859301",
    appId: "1:426691859301:web:365afd3b4458585e23478c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);