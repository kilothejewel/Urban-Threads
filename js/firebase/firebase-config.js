// TODO: Import the functions you need from the Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHBcJirJkpOYzghDjWcU_riavd_TpwFOA",
  authDomain: "urban-threads-3a359.firebaseapp.com",
  projectId: "urban-threads-3a359",
  storageBucket: "urban-threads-3a359.firebasestorage.app",
  messagingSenderId: "438750157781",
  appId: "1:438750157781:web:ccfbb6492e31ff5f9e3b5c",
};

// TODO: Initialize Firebase and export 'auth'
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
