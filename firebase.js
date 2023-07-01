import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDhIoOaXinUzq5rVyblEUKWQTTm_74BSZs",
  authDomain: "e-commerce-test-app-c283e.firebaseapp.com",
  projectId: "e-commerce-test-app-c283e",
  storageBucket: "e-commerce-test-app-c283e.appspot.com",
  messagingSenderId: "925454164007",
  appId: "1:925454164007:web:bb107d1f78eafd23c76e02",
  measurementId: "G-PGBM3E151P"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};