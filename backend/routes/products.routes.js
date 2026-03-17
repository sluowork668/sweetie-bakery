import express from "express";
import { getDb } from "../db/mongo.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const products = await db
      .collection("products")
      .find({})
      .limit(20)
      .toArray();

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const product = await db
      .collection("products")
      .findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// POST new product
router.post("/", async (req, res) => {
  try {
    const db = getDb();
    const newProduct = req.body;

    await db.collection("products").insertOne(newProduct);

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

export default router;
