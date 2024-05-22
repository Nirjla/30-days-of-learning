import express, { response } from "express";
import { User } from "../mongoose/schemas/user.mjs";

const router = express.Router();

router.get("/users", async (request, response) => {
  request.sessionStore.get(request.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log("Inside Session Store")
    console.log(sessionData)
  });
  try {
    const users = await User.find();
    return response.status(200).send(users);
  } catch (err) {
    console.error(err);
    return response.status(400);
  }
});

export default router;
