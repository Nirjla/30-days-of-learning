import mongoose from "mongoose";

const DiscordUserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  discordId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  type: {
    type: mongoose.Schema.Types.String,
    default: "discord",
  },
});
export const DiscordUser = mongoose.model("DiscordUser", DiscordUserSchema);
