import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const {name, email, password ,role} = req.body;

    if (!name ||!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user= await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student"
    });

// Generate JWT
   const token = generateToken(user);

   res.status(201).json({
  message: "User registered successfully",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Validate
    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    } 

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false   // true only in production with HTTPS
  })

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax"
    });

    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};
