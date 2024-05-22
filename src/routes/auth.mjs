import express, { request, response } from "express";
import passport from "passport";
import { User } from "../mongoose/schemas/user.mjs";
import { createUserValidation } from "../utils/validationSchema.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { hashPassword } from "../utils/helpers.mjs";

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
router.post(
  "/login",
  checkSchema(createUserValidation),
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() });
    }
    const data = matchedData(request);
    const hashedPassword = await hashPassword(data.password);
    const newUser = new User({ ...data, password: hashedPassword });
    try {
      const savedUser = await newUser.save();
      return response.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return response.status(400).send("Bad Request");
    }
  }
);
router.get("/auth/logout", (request, response) => {
  if (request.isAuthenticated()) {
    request.logout((err) => {
      if (err) {
        return response.status(400);
      }
      response.status(200).send({ status: "Logout Successfully" });
    });
  }
});
// for discord strategy
router.get("/auth/discord", passport.authenticate("discord"));
//first endpoint is called then passpirt.authenticate this will redirect to third party platform once the authorize button is clicked this will redirect to the callbackURL so when the passport.authenticate is called the second time its going to take that code query parameter and its going to exchange it for an accessToken and refreshToken and then in the end it calls the verify function
router.get(
  "/auth/discord/redirect",
  passport.authenticate("discord"),
  (request, response) => {
    console.log(request.session);
    console.log(request.user);
    return response.status(200);
  }
);
export default router;
