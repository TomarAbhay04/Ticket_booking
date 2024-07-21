// firebase.js
import {initializeApp} from 'firebase/app';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOWrvXxEOcEdxc5GLCXCLU8gN6f7ihQ8Q",
  authDomain: "movie-users-33bc2.firebaseapp.com",
  projectId: "movie-users-33bc2",
  storageBucket: "movie-users-33bc2.appspot.com",
  messagingSenderId: "905846850164",
  appId: "1:905846850164:web:3d7694a926af7487c74721"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider };
