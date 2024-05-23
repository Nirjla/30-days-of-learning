import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/helpers.mjs";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) {
        return done(null, false, { message: "User not found" });
      }
      if (!comparePassword(password, findUser.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      // Set user type if needed
      findUser.type = "local";
      return done(null, findUser);
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
