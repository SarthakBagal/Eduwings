import User from "../models/user.js"
import bcrypt from "bcryptjs"

// ── STEP 1: Verify user exists by email ──────────────────────
export const verifyUser = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required." })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(404).json({ message: "No account found with this email." })
    }

    res.json({
      message: "User found.",
      user: {
        id:   user._id,
        name: user.name,
        email: user.email,
        role:  user.role
      }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ── STEP 2: Reset password ────────────────────────────────────
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(404).json({ message: "No account found with this email." })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    await user.save()

    res.json({ message: "Password updated successfully." })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}