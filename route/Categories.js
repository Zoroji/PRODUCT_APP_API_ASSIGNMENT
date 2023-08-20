const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/categorySchema");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       '200':
 *         description: Successful response
 */


module.exports = router;