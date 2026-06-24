import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({
      email: normalizedEmail,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification code
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();


    // Create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,

      // User cannot choose role
      role: "candidate",

      isVerified: false,

      verificationToken,

      verificationTokenExpiresAt:
        Date.now() + 24 * 60 * 60 * 1000,
    });


    // Generate JWT
    const token = generateToken(user._id);


    res.status(201).json({
      success: true,
      message: "User created successfully. Please verify your email.",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },

      token,

      // Temporary: remove after adding email service
      verificationToken,
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
  email: email.toLowerCase().trim(),
});

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    res.status(401).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};