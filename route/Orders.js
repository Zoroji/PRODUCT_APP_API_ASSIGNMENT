const express = require("express");
const Orders = require("../models/ordersSchema");
const router = express.Router();

router.post("/", async (req, res) => {

    try {
        const { username } = req.body;
        const order = await Orders.find({ username: username })

        if (order.length === 0) {
            return res.json({ message: "user have not ordered yet" })
        }
        res.json(order)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Get user's orders
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
 *                 default: luffyFromPatna
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
        const { username, CartId } = req.body;

        const newOrder = {
            username: username,
            CartId: CartId
        };

        const order = await Orders.create(newOrder);
        res.json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @swagger
 * /orders/add:
 *   post:
 *     summary: Add a new order
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
 *                 default: luffyFromPatna
 *               CartId:
 *                 type: string
 *                 description: ID of the cart
 *                 default: 64e1ffc0c2df229719ef0776
 *             required:
 *               - username
 *               - CartId
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */



router.post("/order-history", async (req, res) => {
    try {

        const { username } = req.body;
        const order = await Orders.find({ username: username })

        if (order.length === 0) {
            return res.json({ message: "user have not ordered yet" })
        }
        res.json(order)


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
})
/**
 * @swagger
 * /orders/order-history:
 *   post:
 *     summary: Get user's order history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 default: luffyFromPatna
 *                 description: Username of the user
 *             required:
 *               - username
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */



router.post("/:orderId", async (req, res) => {
    try {
     
        const orderId = req.params.orderId;
        console.log(orderId);
        const order = await Orders.findById(orderId).populate("CartId");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
/**
 * @swagger
 * /orders/{orderId}:
 *   post:
 *     summary: Get order details by order ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *           default: 64e19dba4f63379234984676
 *         required: true
 *         description: ID of the order
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */


module.exports = router;
