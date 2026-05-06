import { auth } from "../firebase/firebase-config.js";
// import the signInWithEmailAndPassword and createUserWithEmailAndPassword functions from the Firebase Auth CDN
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");
  const showRegisterLink = document.getElementById("show-register");
  const showLoginLink = document.getElementById("show-login");
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  // Toggle between login and register forms
  showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.display = "none";
    registerContainer.style.display = "block";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
  });

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerContainer.style.display = "none";
    loginContainer.style.display = "block";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
  });

  // Handle Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Attempting to log in...", email);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged in successfully!", userCredential.user.email);
        // Redirect the user back to the home page!
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Login failed:", error.code, error.message);
        errorMessage.innerText =
          "Incorrect email or password. Please try again.";
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
      });
  });

  // Handle Registration
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
