import passport from "passport";
import { DiscordUser } from "../mongoose/schemas/discord-user.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import discordStrategy from "./discord-strategy.mjs";
import localStrategy from "./local-strategy.mjs";

passport.serializeUser((user, done) => {
  console.log("Inside Serialize User");
  done(null, { id: user.id, type: user.type });
});

passport.deserializeUser(async (obj, done) => {
  console.log("Inside DeSerialize User");

  try {
    let user;
    if (obj.type === "discord") {
      user = await DiscordUser.findById(obj.id);
    } else {
      user = await User.findById(obj.id);
    }
    if (!user) {
      throw new Error("User not Found");
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
passport.use("discord",discordStrategy);
passport.use("local",localStrategy);

export default passport;
