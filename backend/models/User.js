import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },

    // Email verification status
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Verification code sent by email
    verificationToken: {
      type: String,
    },

    // Expiration date of verification code
    verificationTokenExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);