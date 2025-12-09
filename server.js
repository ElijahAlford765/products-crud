const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const pg = require("pg");
const pgSession = require("connect-pg-simple")(session);

dotenv.config();

const app = express(); // MUST BE FIRST

// ---- DATABASE POOL ----
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ---- MIDDLEWARE ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// SESSION
app.use(
  session({
    store: new pgSession({ pool }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

// ---- ROUTES ----
app.use("/api/sneakers", require("./routes/sneaksRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));

// ---- STATIC VITE BUILD ----
const buildPath = path.join(process.cwd(), "react-frontend", "dist");

app.use(express.static(buildPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ---- START SERVER ----
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
