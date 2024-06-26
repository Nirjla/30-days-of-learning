import express from "express";
import session from "express-session";
import passport from "passport";
import routes from "./routes/index.mjs";
import "./strategies/index.mjs";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
dotenv.config();

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// mongoDB connection
mongoose
  .connect(process.env.DB_URL) //connect returns promise
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error: ${err}`));

// Session middleware
app.use(
  session({
    secret: "secret-key",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (request, response) => {
  response.status(200).send("Hello World");
});

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
