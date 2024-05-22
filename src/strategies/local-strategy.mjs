import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/helpers.mjs";
import { response } from "express";


passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) {
        throw new Error("User Not Found");
      }
      if (!comparePassword(password, findUser.password)) {
        throw new Error("Bad Credentials");
      }
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

export default passport;
