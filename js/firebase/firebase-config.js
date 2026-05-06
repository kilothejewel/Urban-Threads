import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHBcJirJkpOYzghDjWcU_riavd_TpwFOA",
  authDomain: "urban-threads-3a359.firebaseapp.com",
  projectId: "urban-threads-3a359",
  storageBucket: "urban-threads-3a359.firebasestorage.app",
  messagingSenderId: "438750157781",
  appId: "1:438750157781:web:ccfbb6492e31ff5f9e3b5c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
