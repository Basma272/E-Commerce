import { UserModel } from "../models/UserModel.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/respone-Handling.js";
import { sendOtpEmail } from "../utils/sentOtpemail.js";
import jwt from "jsonwebtoken";

// ==============================
// Helpers
// ==============================

const generateOtp = () => `${Math.floor(100000 + Math.random() * 900000)}`;

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRE_TOKEN }
  );

// ==============================
// @route   POST /api/auth/signup
// ==============================

export const signup = asyncHandling(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = new UserModel({ username, email, password });
  user.otp = generateOtp();
  user.otpExpires = Date.now() + 10 * 60 * 1000;

  await user.save();
  await sendOtpEmail(email, user.otp);

  return sucssesResponse({
    res,
    status: 201,
    message: "User registered. OTP sent to email.",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

// ==============================
// @route   POST /api/auth/resend-otp
// ==============================

export const resendOtp = asyncHandling(async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User not found");
  if (user.isVerified)
    return sucssesResponse({ res, message: "Email already verified" });

  user.otp = generateOtp();
  user.otpExpires = Date.now() + 10 * 60 * 1000;

  await user.save();
  await sendOtpEmail(email, user.otp);

  return sucssesResponse({
    res,
    status: 200,
    message: "New OTP sent to email",
  });
});

// ==============================
// @route   POST /api/auth/confirm
// ==============================

export const confirmEmail = asyncHandling(async (req, res) => {
  const { email, otp } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User not found");
  if (user.isVerified)
    return sucssesResponse({ res, message: "Email already verified" });

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    const error = new Error("Invalid or expired OTP");
    error.statusCode = 400;
    throw error;
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = generateToken(user);

  return sucssesResponse({
    res,
    message: "Email verified. Logged in successfully.",
    data: {
      accessToken: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    },
  });
});

// ==============================
// @route   POST /api/auth/login
// ==============================

export const login = asyncHandling(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User not found");

  if (!user.isVerified) {
    const error = new Error("Please confirm your email");
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);

  return sucssesResponse({
    res,
    message: "Logged in successfully",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    },
  });
});