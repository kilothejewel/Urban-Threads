import { auth } from "../firebase/firebase-config.js";
// import the signInWithEmailAndPassword function from the Firebase Auth CDN
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Attempting to log in...", email);

    // TODO: Use signInWithEmailAndPassword(auth, email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged in successfully!", userCredential.user.email);
        // Redirect the user back to the home page!
        window.location.href = "index.html"; 
      })
      .catch((error) => {
        console.error("Login failed:", error.code, error.message);
        errorMessage.innerText = "Incorrect email or password. Please try again.";
        errorMessage.style.display = "block";
      });
  });
});
