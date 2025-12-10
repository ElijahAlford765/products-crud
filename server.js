const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure: true if HTTPS
  })
);

// Routes
const productRoutes = require("./routes/productRoutes"); // productRoutes.js
const cartRoutes = require("./routes/cart");             // cart.js
const userRoutes = require("./routes/userRoutes");       // userRoutes.js
const orderRoutes = require("./routes/orders");          // orders.js
const reviewsRoutes = require("./routes/reviews");       // reviews.js
const wishlistRoutes = require("./routes/wishlist");     // wishlist.js
const sneaksRoutes = require("./routes/sneaksRoutes");   // sneaksRoutes.js

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/sneaks", sneaksRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
