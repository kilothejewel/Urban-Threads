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

        // Redirect directly to home page after a short delay
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      })
      .catch((error) => {
        console.error("Registration failed:", error.code, error.message);
        errorMessage.innerText = error.message; // Use Firebase error message for details like weak password
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
      });
  });
});
