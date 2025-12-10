const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "supersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 }
}));

// API route
app.get("/api/hello", (req, res) => res.json({ message: "Hello from server!" }));

// Serve React
const reactDist = path.join(__dirname, "react-frontend", "dist");
app.use(express.static(reactDist));

// Catch-all
app.get("*", (req, res) => res.sendFile(path.join(reactDist, "index.html")));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
