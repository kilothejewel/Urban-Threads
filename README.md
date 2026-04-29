# Urban Threads 🏪 E-Commerce Store

**Urban Threads** is a premium, modern e-commerce website built with **Vanilla JavaScript**, **HTML5**, and **CSS3**. It features a dynamic product catalog powered by **Firebase Firestore**, a persistent shopping cart, and secure user authentication.

## 🚀 Features

- **✨ Premium UI Design**: Clean, modern interface with smooth animations and micro-interactions.
- **🔥 Dynamic Product Catalog**: Real-time product fetching from Firebase Firestore.
- **🛒 Persistent Shopping Cart**: Items stay in your cart even if you refresh the page or close the browser (using LocalStorage).
- **🔐 Firebase Authentication**: Secure user sign-up and login system.
- **⚡ Instant Feedback**: Buttons and UI elements react instantly to user actions (e.g., "Adding..." states, Toast notifications).
- **📱 Responsive Design**: Optimized for both desktop and mobile devices.
- **🎨 Design System**: Consistent colors, typography, and spacing throughout the site.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend/Database**: Firebase (Firestore & Authentication)
- **Styling**: CSS Custom Properties (Variables), Flexbox, Grid
- **Deployment**: Static Site (Easy to deploy on Netlify, Vercel, GitHub Pages)

## 📂 Project Structure

```
Urban-Threads/
├── css/
│   ├── styles.css       # Core styles, global variables, layout
│   └── components.css   # Card designs, buttons, modals
├── js/
│   ├── firebase/        # Firebase configuration and authentication
│   │   ├── firebase-config.js
│   │   └── auth.js
│   ├── pages/           # Page-specific logic
│   │   ├── main.js      # Home page (product display)
│   │   ├── cart.js      # Cart page (checkout logic)
│   │   ├── login.js     # Login page
│   │   └── signup.js    # Signup page
│   └── utils/           # Utility functions
│       ├── cartStore.js # Cart management (LocalStorage)
│       └── ui.js        # UI helpers (modals, toasts)
├── assets/
│   └── images/          # Product images and icons
├── index.html           # Home Page
├── login.html           # Login Page
├── signup.html          # Signup Page
├── cart.html            # Shopping Cart Page
├── about.html           # About Page
└── README.md            # This file
```

## 🚀 Getting Started

1.  **Prerequisites**: A modern web browser and a Firebase account.
2.  **Setup Firebase**:
    - Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    - Add a Web App to your project.
    - Enable **Firestore** and **Email/Password** authentication.
    - Copy your Firebase configuration into `js/firebase/firebase-config.js`.
    - Add your products to the Firestore "products" collection.

## 🏃‍♂️ Running Locally

Because we are using Firebase and LocalStorage, you can run this project using any static file server.

**Option 1: VS Code Live Server**

1.  Install the "Live Server" extension.
2.  Right-click `index.html` -> "Open with Live Server".

**Option 2: Node.js (npm)**

1.  Install `serve` globally: `npm install -g serve`
2.  Run in your terminal: `serve`

## 🔐 Firebase Configuration

Ensure your `js/firebase/firebase-config.js` looks like this (replace values with your own):

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```
