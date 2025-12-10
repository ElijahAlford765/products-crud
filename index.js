"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./models/db"); // your Pool instance

const app = express();

// Middleware
app.use(express.json());

import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",   // must match Vite dev server
    credentials: true
  })
);


// Session Middleware
app.use(
  session({
    store: new pgSession({
      pool: db,
      tableName: "session", // must match your Neon table
    }),
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      secure: false, // TRUE on Render.com (HTTPS)
    },
  })
);

// Routes
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cart");
const sneaksRoutes = require("./routes/sneaks");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require("./routes/wishlist");
const reviewsRoutes = require("./routes/reviews");

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/sneaks", sneaksRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
