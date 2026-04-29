import { initAuthListener } from "../firebase/auth.js";
import { db } from "../firebase/firebase-config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { addToCart } from "../utils/cartStore.js";

async function fetchAndRenderProducts() {
  const productGrid = document.getElementById("product-grid");

  try {
    // 1. Reference the 'products' collection in our db
    const productsRef = collection(db, "products");

    // 2. Fetch the documents
    const querySnapshot = await getDocs(productsRef);

    // 3. Clear out the "Loading..." text
    productGrid.innerHTML = "";

    // 4. Loop through the documents and build the HTML!
    querySnapshot.forEach((doc) => {
      const product = doc.data(); // This gives us an object with { name, price, imageUrl }

      const cardHTML = `
        <div class="product-card">
          <img
            src="${product.imageUrl}"
            alt="${product.name}"
            class="product-image"
          />
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${Number(product.price).toFixed(2)}</p>
            <button class="btn-primary add-to-cart-btn" data-id="${doc.id}">
              Add to Cart
            </button>
          </div>
        </div>
      `;
      // Inject the newly built card into the grid
      productGrid.innerHTML += cardHTML;
    });

    // Listen for clicks inside the product grid
    productGrid.addEventListener("click", async (e) => {
      // Check if the clicked element has the 'add-to-cart-btn' class
      if (e.target.classList.contains("add-to-cart-btn")) {
        const productId = e.target.getAttribute("data-id");
        
        // Find the product data from our fetched snapshot
        const docSnap = querySnapshot.docs.find(d => d.id === productId);
        if (docSnap) {
          const productData = docSnap.data();
          productData.id = productId; // Add the ID into the object
          
          // Provide instant feedback
          const originalText = e.target.innerText;
          e.target.innerText = "Adding...";
          e.target.disabled = true;
          
          // Call our async cart store!
          await addToCart(productData);
          
          // Reset button
          e.target.innerText = originalText;
          e.target.disabled = false;
          
          // Show beautiful Toast Notification (Creativity Points!)
          showToast(`Added ${productData.name} to cart!`);
        }
      }
    });

  } catch (error) {
    console.error("Error fetching products: ", error);
    productGrid.innerHTML =
      "<p style='color:red'>Failed to load store inventory.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Urban Threads App Loaded!");
  initAuthListener();
  fetchAndRenderProducts(); // Call our new function!
});

// Toast Notification Helper (Sprint 4 Polish)
function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  
  // Trigger reflow to restart animation if clicked quickly
  toast.classList.remove("show");
  void toast.offsetWidth;
  
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
