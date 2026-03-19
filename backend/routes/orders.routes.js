import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo.js";

const router = express.Router();

// GET: Fetch all orders (For the Staff Dashboard)
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    // Native driver: find({}) gets everything, toArray() converts the cursor
    const orders = await db.collection("orders").find({}).toArray();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST: Create a new order (For the Customer Checkout)
router.post("/", async (req, res) => {
  try {
    const db = getDb();
    const newOrder = {
      ...req.body,
      status: "pending", // Default status for new orders
      createdAt: new Date(),
    };
    const result = await db.collection("orders").insertOne(newOrder);
    res.status(201).json({ message: "Order created", orderId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// PUT: Update order status (For Staff to mark as in-progress/completed)
router.put("/:id", async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

// DELETE: Remove cancelled or incorrect orders
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    const result = await db.collection("orders").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
});

export default router;