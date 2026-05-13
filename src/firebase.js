import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOU_aBzqCoNk5G8N4jWvxp3WC2WCiCpFg",
  authDomain: "edu-platform-18822.firebaseapp.com",
  projectId: "edu-platform-18822",
  storageBucket: "edu-platform-18822.firebasestorage.app",
  messagingSenderId: "395094181046",
  appId: "1:395094181046:web:85fc21fb5317090478d217",
  measurementId: "G-MDLLDH6D0R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
