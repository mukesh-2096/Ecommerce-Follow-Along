const express = require("express");
const Order = require("../model/order");
const authMiddleware = require("../middleware/auth"); // Ensure authentication
const router = express.Router();

// 🆕 Add Address & Create Order API
router.post("/add-address", authMiddleware, async (req, res) => {
    try {
        const { street, city, state, zipCode, items, totalAmount } = req.body;

        // Validate required fields
        if (!street || !city || !state || !zipCode || !items || !totalAmount) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Get the authenticated user from token
        const userId = req.user.id;

        // Create new order with address
        const newOrder = new Order({
            user: userId,
            items,
            address: { street, city, state, zipCode },
            totalAmount,
        });

        await newOrder.save();
        res.status(201).json({ message: "Address added & Order created successfully!", order: newOrder });

    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Failed to add address" });
    }
});

module.exports = router;
