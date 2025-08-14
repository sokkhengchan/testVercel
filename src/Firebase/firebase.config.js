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
  apiKey: "AIzaSyDUexknqHyGlzTUmJfT5BmFRLEEsN1I9B8",
  authDomain: "fir-react-afternoon.firebaseapp.com",
  projectId: "fir-react-afternoon",
  storageBucket: "fir-react-afternoon.firebasestorage.app",
  messagingSenderId: "543948223078",
  appId: "1:543948223078:web:9b8361ca71dbfc075e33a7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// ----Ai
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, facebookProvider, githubProvider };