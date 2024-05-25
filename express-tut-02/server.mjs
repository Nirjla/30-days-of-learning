import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/product.model.mjs";
dotenv.config();

const app = express();
app.use(json());
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(500).send(product)
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// database connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
