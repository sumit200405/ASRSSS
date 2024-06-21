// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Your web app's Firebase configuration
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
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
auth.languageCode = 'en';

const googlelogin = document.getElementById("login-google");

googlelogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user)
    window.location.href = "/dashboard"
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
})

onAuthStateChanged(auth, (user) => {
  if (user) {
      // If user is not logged in, redirect to login page
      window.location.href = '/dashboard';
  }
});

