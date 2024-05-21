import express, { response } from "express";
import passport from "passport";

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

export default router;
