import { verifyAuthToken } from "../services/auth.service.js";

export function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.br_session;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const payload = verifyAuthToken(token);
    req.user = { id: payload.sub, username: payload.username };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
