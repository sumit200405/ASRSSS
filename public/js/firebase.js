import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLeOxfyJHqFHJO33WDEjQfV0pEc_NqFRA",
  authDomain: "asrsss.firebaseapp.com",
  projectId: "asrsss",
  storageBucket: "asrsss.appspot.com",
  messagingSenderId: "601506172253",
  appId: "1:601506172253:web:f785757801627affb1acb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };