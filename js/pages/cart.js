import { initAuthListener } from "../firebase/auth.js";
import { getCart, removeFromCart, updateCartBadge, saveCart } from "../utils/cartStore.js";
import { auth } from "../firebase/firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  initAuthListener();

  // Listen to auth state to render the correct cart!
  onAuthStateChanged(auth, (user) => {
    updateCartBadge();
    renderCart();
  });

  // Listen to the cartUpdated event to refresh the UI when items are removed
  document.addEventListener('cartUpdated', () => {
    renderCart();
  });

  // Sprint 4: Handle Payment Simulating
  document.getElementById("payment-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop page reload
    
    // Simulate API delay
    const btn = e.target.querySelector("button");
    btn.innerText = "Processing...";
    btn.style.opacity = 0.7;

    setTimeout(async () => {
      alert("Payment successful! Your streetwear is on the way.");
      // Clear the local cart
      await saveCart([]); 
      window.location.href = "index.html"; // Redirect to home
    }, 1500);
  });
});

async function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const checkoutSection = document.getElementById("checkout-section");
  const cartTotal = document.getElementById("cart-total");
  
  const cart = await getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    checkoutSection.style.display = "none";
    return;
  }

  // Clear before rendering
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += parseFloat(item.price) * item.quantity;
    
    const row = document.createElement("div");
    row.style = "display: flex; align-items: center; justify-content: space-between; background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);";
    
    row.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="${item.imageUrl}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
        <div>
          <h4 style="margin:0;">${item.name}</h4>
          <span style="color: #666;">R${Number(item.price).toFixed(2)} x ${item.quantity}</span>
        </div>
      </div>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.style = "background: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;";
    removeBtn.onclick = async () => await removeFromCart(item.id);

    row.appendChild(removeBtn);
    cartItemsContainer.appendChild(row);
  });

  // Show checkout and total
  checkoutSection.style.display = "block";
  cartTotal.innerText = `R${total.toFixed(2)}`;
}
