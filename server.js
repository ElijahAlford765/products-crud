// server.js
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session setup
app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "supersecretkey", // Must have a secret!
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Serve React frontend (make sure your build folder is correct)
app.use(express.static(path.join(__dirname, "react-frontend", "dist")));

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Catch-all route to serve React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "react-frontend", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
