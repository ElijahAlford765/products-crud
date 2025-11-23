"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));

// Routes
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cart");
const sneaksRoutes = require("./routes/sneaks");
const userRoutes = require("./routes/userRoutes");

// New routes
const wishlistRoutes = require("./routes/wishlist");
const reviewsRoutes = require("./routes/reviews");

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/sneaks", sneaksRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
