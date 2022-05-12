import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIxDoFc594akSBAIlehgGvC1Qp9Z91QcU",
  authDomain: "cookbook-jessemogensen.firebaseapp.com",
  projectId: "cookbook-jessemogensen",
  storageBucket: "cookbook-jessemogensen.appspot.com",
  messagingSenderId: "662707412071",
  appId: "1:662707412071:web:83205e9be4372acf8f08c2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
