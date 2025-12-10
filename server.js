const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);


const productRoutes = require("./routes/productRoutes"); 
const cartRoutes = require("./routes/cart");             
const userRoutes = require("./routes/userRoutes");       
const orderRoutes = require("./routes/orders");          
const reviewsRoutes = require("./routes/reviews");       
const wishlistRoutes = require("./routes/wishlist");     
const sneaksRoutes = require("./routes/sneaksRoutes");   

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/sneakers", sneaksRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
