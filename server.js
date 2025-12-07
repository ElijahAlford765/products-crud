"use strict";

const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);

dotenv.config();

const app = express();

// ---- DATABASE POOL ----
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ---- MIDDLEWARE ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: must come before routes
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,               // allow cookies
  })
);

// SESSION: must come before routes
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set true if using HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// ---- API ROUTES ----
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/sneakers", require("./routes/sneaks"));
app.use("/api/cart", require("./routes/cart"));

// ---- STATIC REACT BUILD ----
const buildPath = path.join(__dirname, "react-frontend", "build");
app.use(express.static(buildPath));

// ---- SPA CATCH-ALL (KEEP LAST) ----
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ---- START SERVER ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
