// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// ---AI
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBSbBFg1F4eYqiwCVh0DrM1E1jfe_KWzY",
  authDomain: "react-fire-base-80542.firebaseapp.com",
  projectId: "react-fire-base-80542",
  storageBucket: "react-fire-base-80542.firebasestorage.app",
  messagingSenderId: "812383168890",
  appId: "1:812383168890:web:513df6ed04214d01aa0ec3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// ----Ai
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, facebookProvider, githubProvider };