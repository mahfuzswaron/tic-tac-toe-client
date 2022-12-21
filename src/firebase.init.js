// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_apiKey,
    // authDomain: process.env.REACT_APP_authDomain,
    // projectId: process.env.REACT_APP_projectId,
    // storageBucket: process.env.REACT_APP_storageBucket,
    // messagingSenderId: process.env.REACT_APP_messagingSenderId,
    // appId: process.env.REACT_APP_appId,

    apiKey: "AIzaSyCh5FA62NAofA5YZMmJ4dojV-1Y5JzCgXs",
    authDomain: "tic-tac-toe-by-mahfuzswaron.firebaseapp.com",
    projectId: "tic-tac-toe-by-mahfuzswaron",
    storageBucket: "tic-tac-toe-by-mahfuzswaron.appspot.com",
    messagingSenderId: "488547413172",
    appId: "1:488547413172:web:e2a9b869214ae75e00bbe1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;