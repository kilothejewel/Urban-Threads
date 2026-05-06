import { auth } from "../firebase/firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    console.log("Attempting to register...", email);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Registered successfully!", userCredential.user.email);
        successMessage.innerText =
          "Account created successfully! Logging you in...";
        successMessage.style.display = "block";
        errorMessage.style.display = "none";

        // Show explicit alert so user knows it worked
        alert("Account created successfully! You are now logged in.");

        // Redirect directly to home page after user dismisses alert
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Registration failed:", error.code, error.message);
        errorMessage.innerText = error.message; // Use Firebase error message
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
        
        // Show explicit alert so user knows something went wrong
        alert("Registration failed: " + error.message);
      });
  });
});
