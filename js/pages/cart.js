import { initAuthListener } from "../firebase/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  initAuthListener();
  console.log("Cart logic loaded!");
  // Later we will fetch user's cart from Firestore here.
});
