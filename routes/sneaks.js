"use strict";
const express = require("express");
const router = express.Router();
const cors = require('cors');
const sneaksService = require('../services/SneaksService');

router.use(cors({ methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));

router.get("/popular", async (req, res) => {
    try {
        const products = await sneaksService.getPopularShoes();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).send("Missing query parameter!");
        const products = await sneaksService.searchShoes(query);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
