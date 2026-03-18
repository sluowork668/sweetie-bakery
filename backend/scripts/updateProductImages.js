import dotenv from "dotenv";
import { connectToMongo, getDb } from "../db/mongo.js";

dotenv.config();

const imageMappings = [
  {
    name: "Mochi Donuts (12 pcs)",
    imageUrl: "/images/products/mochi-donuts-box.jpg",
  },
  {
    name: "Mini Kroffle",
    imageUrl: "/images/products/mini-kroffle.jpg",
  },
  {
    name: "Sea Salt French Cream Thai Tea",
    imageUrl: "/images/products/thai-tea.jpg",
  },
  {
    name: "Crispy Egg Rolls",
    imageUrl: "/images/products/crispy-egg-rolls.jpg",
  },
  {
    name: "Seaweed Pork Floss Egg Roll",
    imageUrl: "/images/products/default.jpg",
  },
  {
    name: "Coconut Egg Rolls",
    imageUrl: "/images/products/default.jpg",
  },
  {
    name: "Scallion Pork Floss Cake",
    imageUrl: "/images/products/scallion-pork-floss-cake.jpg",
  },
  {
    name: "Tiramisu Cuicuidun",
    imageUrl: "/images/products/default.jpg",
  },
  {
    name: "Blueberry Cuicuidun",
    imageUrl: "/images/products/default.jpg",
  },
  {
    name: "Mango Cuicuidun",
    imageUrl: "/images/products/default.jpg",
  },
];

async function updateProductImages() {
  try {
    await connectToMongo(process.env.MONGODB_URI, process.env.DB_NAME);
    const db = getDb();
    const productsCollection = db.collection("products");

    for (const item of imageMappings) {
      await productsCollection.updateOne(
        { name: item.name },
        { $set: { imageUrl: item.imageUrl } },
      );
    }

    console.log("Product images updated successfully.");
  } catch (error) {
    console.error("Error updating product images:", error);
  }
}

updateProductImages();
