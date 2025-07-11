import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Not authorized, token failed" });
  }
};

export { authMiddleware, generateToken, verifyToken };
