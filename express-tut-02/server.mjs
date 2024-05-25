import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  productRoutes  from "./routes/product.route.mjs";
dotenv.config();

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
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
