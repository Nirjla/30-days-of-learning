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
    res.status(500).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    // const { id } = req;
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send("Product Not Found");
    }
    res.status(200).send(product);
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

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      res.status(404).send("Product Not Found");
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).send("Product Not Found");
    }
    res.status(200).send(product);

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
