import express, { response } from "express";
import passport from "passport";
import { User } from "../mongoose/schemas/user.mjs";

const router = express.Router();
router.post("/auth", passport.authenticate("local"), (request, response) => {
  return response.status(200).send("Authenticated");
  //complete syntax lekhnu parcha
});
router.get("/auth/status", (request, response) => {
  if (request.isAuthenticated()) {
    return response
      .status(200)
      .send({ status: "Authenticated", user: request.user });
  } else {
    return response.status(401).send({ status: "Not Authenticated" });
  }
});
router.post("/users", async (request, response) => {
  const { body } = request;
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    return response.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return response.status(400);
  }
});

export default router;
