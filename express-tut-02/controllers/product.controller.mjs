import { Product } from "../models/product.model.mjs";

export const getProducts = async (req, res) => {
  try {
    const product = await Product.find({});

    res.status(500).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getProductById = async (req, res) => {
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
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
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
};
