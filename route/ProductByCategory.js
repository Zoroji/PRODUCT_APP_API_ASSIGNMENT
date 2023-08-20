const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/categorySchema");
const Product = require("../models/productSchema");

const router = express.Router();

router.get("/:name", async (req, res) => {
    try {
        const categoryName = req.params.name;
       const  products = await Product.find({category:categoryName})
        
        res.json(products);
    } catch (error) {
        console.error("Error fetching category by name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @swagger
 * /product_by_cat/{name}:
 *   get:
 *     summary: Get all category by name example name {Electronics,Books}
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: name of category
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: category not found
 */


module.exports = router;
