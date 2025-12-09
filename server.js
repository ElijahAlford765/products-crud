"use strict";

const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);

dotenv.config();

const app = express();   // ✅ MUST COME BEFORE using app.*

// ---- DATABASE POOL ----
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ---- MIDDLEWARE ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// ---- API ROUTES ----
app.use("/api/sneakers", require("./routes/sneakers"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));

// ---- STATIC SETUP FOR VITE BUILD ----
// ⬇️ THE FIX IS HERE
const buildPath = path.join(__dirname, "react-frontend", "dist");
app.use(express.static(buildPath));

// ---- SPA FALLBACK ROUTE (KEEP LAST) ----
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ---- START SERVER ----
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
