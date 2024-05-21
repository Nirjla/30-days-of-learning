import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";

passport.serializeUser((user, done) => {
  console.log("Inside Serialize User");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside Deserialize User");
  try {
    const findUser = await User.findById(id);
    if (!findUser) {
      throw new Error("User not found");
    }
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) {
        throw new Error("User Not Found");
      }
      if (findUser.password !== password) {
        throw new Error("Bad Credentials");
      }
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

export default passport;
