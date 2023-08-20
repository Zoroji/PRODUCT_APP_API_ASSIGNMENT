const express = require("express");
const Cart = require("../models/cartSchema");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const cart = await Cart.find({ username: req.body.username }).populate("ProductId");
        if(!cart){ return res.json({message:"user did not add in cart"})}
        res.json(cart);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }

})
/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Get user's cart items {note:removed the middleware temporarly since it was causing a error in SwaggerUI but worked fine in thunderClient}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *                 example: luffyFromPatna
 *             required:
 *               - username
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */



router.post("/add", async (req, res) => {
    try {
        const newCart = {
            ProductId: req.body.ProductId,
            quantity: req.body.quantity,
            username: req.body.username,
        };
        const cart = await Cart.create(newCart)
        res.json(cart);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a new item to user's cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *                 example: luffyFromPatna
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *                 example: 3
 *               ProductId:
 *                 type: string
 *                 description: ID of the product
 *                 example: 64e0d44d7d2adbae1f0ce135
 *             required:
 *               - username
 *               - quantity
 *               - ProductId
 *             example:
 *               username: luffyFromPatna
 *               quantity: 3
 *               ProductId: 64e0d44d7d2adbae1f0ce135
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */





router.patch("/update_quantity", async (req, res) => {

    try {
        const { ProductId, username, quantity } = req.body;

        const cartItem = await Cart.findOne({ ProductId, username });

        if (!cartItem) { return res.status(404).json({ message: "Cart item not found" }) }

        cartItem.quantity = quantity;
       await cartItem.save();

       res.json(cartItem);

    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})
/**
 * @swagger
 * /cart/update_quantity:
 *   patch:
 *     summary: Update quantity of a product in user's cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *                 example: luffyFromPatna
 *               quantity:
 *                 type: integer
 *                 description: New quantity of the product
 *                 example: 1
 *               ProductId:
 *                 type: string
 *                 description: ID of the product
 *                 example: 64e0d44d7d2adbae1f0ce135
 *             required:
 *               - username
 *               - quantity
 *               - ProductId
 *             example:
 *               username: luffyFromPatna
 *               quantity: 1
 *               ProductId: 64e0d44d7d2adbae1f0ce135
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Internal server error
 */



router.delete("/delete", async (req, res) => {

    try {
        const {ProductId,username} = req.body;
        const cart = await Cart.findOneAndDelete({ProductId,username});

        if(!cart){
            console.log("unable to find cart");
            res.status(500).json({message:"did not found cart"})
        }

        res.json({message:"deletion success",deletedCart:cart})

    } catch (error) {
        console.error("Error deleting cart item :", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

/**
 * @swagger
 * /cart/delete:
 *   delete:
 *     summary: Delete a product from user's cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *                 example: luffyFromPatna
 *               ProductId:
 *                 type: string
 *                 description: ID of the product
 *                 example: 64e0d44d7d2adbae1f0ce135
 *             required:
 *               - username
 *               - ProductId
 *             example:
 *               username: luffyFromPatna
 *               ProductId: 64e0d44d7d2adbae1f0ce135
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */



module.exports = router