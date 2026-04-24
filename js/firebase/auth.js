// TODO: Import onAuthStateChanged and your exported auth object
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";
// import { auth } from "./firebase-config.js";

export function initAuthListener() {
  console.log("Auth listener initializing. Waiting for Firebase code...");
  
  // Elements we want to toggle in the UI
  const loginItem = document.getElementById("nav-item-login");
  const logoutItem = document.getElementById("nav-item-logout");
  const cartItem = document.getElementById("nav-item-cart");

  // TODO: Use onAuthStateChanged to toggle elements in the UI
  /*
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
  });
  */
}
