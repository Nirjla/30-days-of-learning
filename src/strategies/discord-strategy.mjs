import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

var scopes = ["identify", "guilds"];

passport.use(new DiscordStrategy({
      clientID:process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET,
      callbackURL:,
      scope:scopes
},(accessToken, refreshToken, profile, done)=>{

}))
