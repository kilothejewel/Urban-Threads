// Main entry point for index.html
import { initAuthListener } from "../firebase/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Urban Threads App Loaded!");
    // Initialize our Auth state listener
    initAuthListener();
});
