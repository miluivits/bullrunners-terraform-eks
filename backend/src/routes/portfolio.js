import { Router } from "express";
import User from "../model/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/add-token", requireAuth, async (req, res) => {
  try {
    const { username, token } = req.body;
    if (!username || !token?.name || typeof token?.amount !== "number") {
      return res
        .status(400)
        .json({ error: "username, token.name, token.amount required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const existing = user.tokens.find((t) => t.name === token.name);
    if (existing) existing.amount += token.amount;
    else user.tokens.push({ name: token.name, amount: token.amount });

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error adding token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/portfolio/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.tokens || []);
  } catch (error) {
    console.error("Error fetching user portfolio:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
