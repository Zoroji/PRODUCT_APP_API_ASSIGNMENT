const express = require("express");
const Product = require("../models/productSchema");
const router = express.Router();

router.get("/", async(req, res) => {
   
    Product.find({}).then((products) => res.json(products));
});

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     responses:
 *       '200':
 *         description: Successful response
 */


router.get("/:productId", async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get all products by id example id {64e0d44d7d2adbae1f0ce135,64e0d44d7d2adbae1f0ce136}
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of product
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Product not found
 */


module.exports = router;
