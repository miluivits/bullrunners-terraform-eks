import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import coinsRoutes from "./routes/coins.js";
import portfolioRoutes from "./routes/portfolio.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", coinsRoutes);
app.use("/api", portfolioRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
