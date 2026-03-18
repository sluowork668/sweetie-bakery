import express from "express";
import { getDb } from "../db/mongo.js";
import { ObjectId } from "mongodb"; 

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const db = getDb();

    const query = req.query.all === "true" ? {} : {};

    const products = await db
      .collection("products")
      .find(query)
      .sort({ _id: 1 })
      .toArray();

    res.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    let query = { id: id };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { id: id }] };
    }

    const product = await db.collection("products").findOne(query);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
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
    const newProduct = {
      id: req.body.id || Date.now().toString(),
      name: req.body.name || "",
      category: req.body.category || "dessert",
      price: Number(req.body.price),
      description: req.body.description || "",
      imageUrl: req.body.imageUrl || "",
      available: req.body.available ?? true,
      isSample: req.body.isSample ?? false,
      createdAt: new Date(),
    };

    if (!newProduct.name || Number.isNaN(newProduct.price)) {
      return res.status(400).json({ error: "Invalid product data" });
    }

    const result = await db.collection("products").insertOne(newProduct);
    res.status(201).json({ ...newProduct, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const { _id, ...updatedData } = req.body; 

    let query = { id: id };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { id: id }] };
    }

    const result = await db.collection("products").updateOne(
      query,
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updated = await db.collection("products").findOne(query);
    res.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    let query = { id: id };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { id: id }] };
    }

    const result = await db.collection("products").deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No product found to delete with ID:", id);
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;