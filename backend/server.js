import express from "express";
import dotenv from "dotenv";
import { connectToMongo } from "./db/mongo.js";
import productsRouter from "./routes/products.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// test route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// products API
app.use("/api/products", productsRouter);

const startServer = async () => {
  try {
    await connectToMongo(process.env.MONGODB_URI, process.env.DB_NAME);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
