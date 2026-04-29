import { db, auth } from "../firebase/firebase-config.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

export async function getCart() {
  const user = auth.currentUser;
  if (user) {
    try {
      const docRef = doc(db, "carts", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().items || [];
      }
      return []; // Return empty array if document doesn't exist yet
    } catch (e) {
      console.error("Error getting cart from Firestore:", e);
    }
  }
  
  // Fallback to local session storage for guests
  const cart = sessionStorage.getItem("urban_threads_cart");
  return cart ? JSON.parse(cart) : [];
}

export async function saveCart(cart) {
  const user = auth.currentUser;
  if (user) {
    try {
      await setDoc(doc(db, "carts", user.uid), { items: cart });
    } catch (e) {
      console.error("Error saving cart to Firestore:", e);
    }
  } else {
    sessionStorage.setItem("urban_threads_cart", JSON.stringify(cart));
  }
  
  updateCartBadge();
}

export async function addToCart(product) {
  const cart = await getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  await saveCart(cart);
  return true;
}

export async function removeFromCart(productId) {
  const cart = await getCart();
  const newCart = cart.filter(item => item.id !== productId);
  await saveCart(newCart);
  
  // Dispatch custom event to tell cart.js to re-render
  document.dispatchEvent(new Event('cartUpdated')); 
}

export async function updateCartBadge() {
  const navCart = document.getElementById("nav-item-cart");
  if (!navCart) return; 
  
  const cart = await getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const link = navCart.querySelector('a');
  if (link) {
      link.innerText = count > 0 ? `Cart (${count})` : "Cart";
  }
}
