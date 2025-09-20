import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import { signAuthToken } from "../services/auth.service.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username and password are required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(409).json({ error: "Username already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, tokens: [] });

    const token = signAuthToken(user);
    res.cookie("br_session", token, { httpOnly: true });
    res.status(201).json({ id: user._id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = signAuthToken(user);
    res.cookie("br_session", token, { httpOnly: true });
    res.json({ id: user._id, username: user.username });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("br_session", { httpOnly: true });
  res.status(204).end();
});

export default router;
