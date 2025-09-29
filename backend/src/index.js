import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { requireAuth } from "./middleware/auth.js";
import {
  Register,
  Login,
  Logout,
  GetUser,
} from "./controllers/auth.controller.js";
import { Global, Markets, Coin } from "./controllers/coins.controller.js";
import { AddToken, UserPortfolio } from "./controllers/portfolio.controller.js";
import { config } from "./config/config.js";

const app = express();
app.use(express.json());

app.post("/api/register", Register);
app.post("/api/login", Login);
app.post("/api/logout", Logout);
app.get("/api/user", cookieParser(), requireAuth, GetUser);
app.get("/api/global", Global);
app.get("/api/markets", Markets);
app.get("/api/coins/:id", Coin);
app.post("/api/add-token", cookieParser(), requireAuth, AddToken);
app.get("/api/portfolio/:username", UserPortfolio);

async function main() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");
    app.listen(config.port, () =>
      console.log(`Server is running on port ${config.port}`)
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

main();
