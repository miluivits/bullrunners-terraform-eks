import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      name: String,
      amount: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
