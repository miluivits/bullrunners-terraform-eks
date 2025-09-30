import jwt from "jsonwebtoken";
import { config } from "../config/config";

export function signAuthToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    config.jwtSecret,
    { expiresIn: "1d" }
  );
}

export function verifyAuthToken(token) {
  return jwt.verify(token, config.jwtSecret);
}
