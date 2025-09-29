import bcrypt from "bcrypt";
import User from "../model/User.js";
import { signAuthToken } from "../services/auth.service.js";

export async function Register(req, res) {
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
    res
      .status(201)
      .json({ user: { id: user._id.toString(), username: user.username } });
  } catch (err) {
    console.error("Sign up error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function Login(req, res) {
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
    res.json({ user: { id: user._id.toString(), username: user.username } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function Logout(_req, res) {
  try {
    res.clearCookie("br_session", { httpOnly: true });
    res.status(204).end();
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function GetUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: { id: user._id.toString(), username: user.username } });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
