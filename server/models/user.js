import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
     name: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
      role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    avatar: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema,"users");
