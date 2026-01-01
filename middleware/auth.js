import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer token"
  if (!authHeader) return res.status(401).json({ message: "Auth header missing" });

  const token = authHeader.split(" ")[1]; // take token after Bearer
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
