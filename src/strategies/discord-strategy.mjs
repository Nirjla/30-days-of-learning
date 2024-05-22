import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import dotenv from "dotenv";
import { DiscordUser } from "../mongoose/schemas/discord-user.mjs";
dotenv.config();

// console.log('CLIENT_ID:', process.env.CLIENT_ID);
// console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);


var scopes = ["identify", "guilds"];
export default passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: scopes,
    },
    //accessToken is shortlived used for making APi requests on the behalf of the user
    //refreshToken is used to refresh the accessToken to obtain a new accesToken once th current one expires
    //this is verify callback fn
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      // console.log(accessToken);
      // console.log(refreshToken);
      let findUser;
      try {
        findUser = await DiscordUser.findOne({ discordId: profile.id });
        done(null, findUser);
      } catch (err) {
        done(err, null);
      }
      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });
          await newUser.save();
          done(null, newUser);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
