import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from "./firebase-config.js";
import { updateCartBadge } from "../utils/cartStore.js";

export function initAuthListener() {
  console.log("Auth listener initializing. Waiting for Firebase code...");

  // Elements we want to toggle in the UI
  const loginItem = document.getElementById("nav-item-login");
  const logoutItem = document.getElementById("nav-item-logout");
  const cartItem = document.getElementById("nav-item-cart");
  const btnLogout = document.getElementById("btn-logout");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user.email);
      // Show Logout, Show Cart, Hide Login
      loginItem.style.display = "none";
      logoutItem.style.display = "block";
      cartItem.style.display = "block";
    } else {
      console.log("User is signed out.");
      // Show Login, Hide Logout, Hide Cart
      loginItem.style.display = "block";
      logoutItem.style.display = "none";
      cartItem.style.display = "none";
    }
    
    // Auth resolved, so now we can accurately fetch the user's cart!
    updateCartBadge();
  });

  // Handle Logout
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      signOut(auth).then(() => {
        console.log("User successfully signed out.");
        alert("You have been successfully logged out.");
        window.location.href = "index.html"; // Redirect to home
      }).catch((error) => {
        console.error("Sign out error", error);
      });
    });
  }
}
