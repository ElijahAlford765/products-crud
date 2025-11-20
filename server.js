"use strict";
const express = require("express");
const path = require('path');
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


// Serve the static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'react-frontend/dist')));

// Direct all non-API requests to the React app's index.html
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});
