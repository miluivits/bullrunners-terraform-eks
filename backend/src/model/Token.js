import mongoose from "mongoose";

const { Schema } = mongoose;

export const TokenSubdocSchema = new Schema({
  name: { type: String, required: true, index: true },
  symbol: { type: String },
  amount: { type: Number, default: 0, min: 0 },
  avgBuyPrice: { type: Number, default: 0, min: 0 },
  lastBuyPrice: { type: Number, default: 0, min: 0 },
  firstBuyAt: { type: Date },
  lastBuyAt: { type: Date },
});
