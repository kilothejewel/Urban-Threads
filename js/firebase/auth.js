import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from "./firebase-config.js";
import { updateCartBadge } from "../utils/cartStore.js";

export function initAuthListener() {
  console.log("Auth listener initializing. Waiting for Firebase code...");

  // Elements we want to toggle in the UI
  const loginItem = document.getElementById("nav-item-login");
  const logoutItem = document.getElementById("nav-item-logout");
  const cartItem = document.getElementById("nav-item-cart");

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
}
