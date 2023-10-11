// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOR09sQzt0fCf8iRiolfXj50tthiOMOA0",
  authDomain: "badbanking-diana-aviles.firebaseapp.com",
  databaseURL: "https://badbanking-diana-aviles-default-rtdb.firebaseio.com",
  projectId: "badbanking-diana-aviles",
  storageBucket: "badbanking-diana-aviles.appspot.com",
  messagingSenderId: "330870794068",
  appId: "1:330870794068:web:977df24136767446c1cac1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };