import jwt from "jsonwebtoken";

export function signAuthToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

export function verifyAuthToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
