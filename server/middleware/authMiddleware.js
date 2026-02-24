import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  
  try {
    const token = req.cookies.token;   // ✅ Read from cookie

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export { protect };


