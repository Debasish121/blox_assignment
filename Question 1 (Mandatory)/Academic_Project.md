# E-Commerce Platform (MERN Stack)

## Project Overview

This is an e-commerce platform built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). The platform provides a seamless online shopping experience with features like product browsing, cart management, and secure payment integration.

## a. What did the system do?

The e-commerce platform allows users to browse products, add them to their shopping cart, and complete purchases securely. Admins can manage inventory, process orders, and monitor customer data. The system integrates secure payment methods and provides a user-friendly front end built with React, while the backend handles requests through Node.js and Express, with MongoDB for data storage.

---

## Features

- **User Registration & Authentication**: Users can register, log in, and manage their profile securely.
- **Product Listing & Search**: Displays a catalog of products with search and filter options.
- **Shopping Cart**: Users can add products to their cart, update quantities, or remove items.
- **Order Management**: Users can view order history, place new orders, and track their order status.
- **Admin Panel**: Admins can manage product inventory, process orders, and view customer details.
- **Payment Integration**: Secure payment gateway integration for transactions (e.g., Razorpay or Stripe).
- **Responsive Design**: The platform adapts to various devices, providing a smooth experience on desktops and mobiles.

---

## Modules & Endpoints

### 1. **User Module**

- **Endpoints**:
  - `POST /api/users/register`: Register a new user.
  - `POST /api/users/login`: User login with JWT authentication.
  - `GET /api/users/profile`: Fetch user profile details (requires authentication).
  - `PUT /api/users/update`: Update user details.

### 2. **Product Module**

- **Endpoints**:
  - `GET /api/products`: Fetch a list of all products.
  - `GET /api/products/:id`: Fetch a single product by ID.
  - `POST /api/products`: Add a new product (Admin only).
  - `PUT /api/products/:id`: Update an existing product (Admin only).

### 3. **Cart Module**

- **Endpoints**:
  - `POST /api/cart`: Add item to cart.
  - `GET /api/cart`: View cart items.
  - `PUT /api/cart/:id`: Update cart item quantity.
  - `DELETE /api/cart/:id`: Remove item from cart.

### 4. **Order Module**

- **Endpoints**:
  - `POST /api/orders`: Create a new order.
  - `GET /api/orders/:id`: Get order details by ID.
  - `GET /api/orders`: Fetch all orders (Admin only).

### 5. **Payment Module**

- **Endpoints**:
  - `POST /api/payment`: Handle payment request and integrate with third-party payment services (e.g., Stripe or Razorpay).

---

## b. What other systems have you seen in the wild like that?

Systems like **Shopify** and **WooCommerce** follow similar approaches, providing customizable e-commerce solutions. They utilize similar architecture, combining front-end and back-end technologies for seamless user experiences. Shopify uses Ruby on Rails for the back end, while WooCommerce runs on WordPress and relies on PHP, but both handle key features like product management, user authentication, and payment integration in the same way.

---

## c. How do you approach the development problem?

I approached the development by breaking the project into smaller components:

1. **Frontend**: I used **React.js** to create dynamic components like product listings, user login, and cart management. I ensured responsiveness and optimized the UI for a smooth user experience on both desktop and mobile devices.
2. **Backend**: I used **Node.js** and **Express.js** to develop RESTful APIs that handle user authentication, product management, and order processing. I implemented **JWT** for secure user authentication.
3. **Database**: **MongoDB** was used to store data, allowing for flexibility in managing product data, user information, and orders.
4. **Payment Integration**: I integrated **Stripe** for secure payment processing. The backend routes handle payment data securely, ensuring that no sensitive information is stored in the database.

---

## d. What were interesting aspects where you copied code from Stack Overflow?

1. **JWT Authentication**: I found several solutions on Stack Overflow for integrating **JWT** for secure user login. The code examples helped me understand the process of generating and verifying tokens, as shown in the following code snippet:

```javascript
// Example: JWT Authentication in Express.js
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });
};

// Verify JWT token middleware
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Access denied" });

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};
```

2. **Payment Integration (Stripe)**: For integrating **Stripe**, I found helpful code snippets for creating payment intents and handling the frontend interactions.

```javascript
// Example: Stripe Payment Integration
const stripe = require("stripe")("stripe_secret_key");

const createPaymentIntent = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });
  return paymentIntent.client_secret;
};
```

## e. What did you learn from some very specific copy-paste?

### JWT Authentication

Copying the code for **JWT authentication** helped me understand how tokens are generated and validated. I had to modify the code to suit my project needs, such as implementing token expiration and custom error handling, but it provided a great foundation for securely managing user sessions.

### Stripe Payment Integration

The payment integration code from **Stack Overflow** helped me understand the flow of creating a payment intent and handling frontend interactions with Stripe's API. The integration code was a bit generic, so I had to adapt it for my project’s specific needs, like linking the payment with an order and ensuring a smooth user experience during checkout.
