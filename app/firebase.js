// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtq-yXYOZjVu2CeiNHSw5TJZXjRdemUOU",
  authDomain: "dashboardnext-ea427.firebaseapp.com",
  projectId: "dashboardnext-ea427",
  storageBucket: "dashboardnext-ea427.appspot.com",
  messagingSenderId: "687804224905",
  appId: "1:687804224905:web:3fa58caf9014024c3c7d58",
  measurementId: "G-GZMVPGV6FR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
