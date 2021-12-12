// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXdes_OPiPHv-b2xusZiRR1UPnLr94lac",
  authDomain: "reactjs-ecommerce-30566.firebaseapp.com",
  projectId: "reactjs-ecommerce-30566",
  storageBucket: "reactjs-ecommerce-30566.appspot.com",
  messagingSenderId: "967769256402",
  appId: "1:967769256402:web:1df7ed5f10f3b81a02d80b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const ggleAuthPrvd = new firebase.auth.GoogleAuthProvider();