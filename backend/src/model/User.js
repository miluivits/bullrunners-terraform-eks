import mongoose from "mongoose";
import { TokenSubdocSchema } from "./Token.js";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  tokens: { type: [TokenSubdocSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
