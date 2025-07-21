import express from "express";
import {
  login,
  signup,
  confirmEmail,
  resendOtp,
} from "../controller/auth.controller.js";

import { validate } from "../middleware/validation.js";

import {
  signupVschema,
  ConfirmEmailVschema,
  ReConfirmEmailVschema,
  loginVschema,
} from "../validation/user.validation.js";

const router = express.Router();

//  Auth Routes
router.post("/signup", validate(signupVschema), signup);
router.post("/confirm-email", validate(ConfirmEmailVschema), confirmEmail);
router.post("/resend-otp", validate(ReConfirmEmailVschema), resendOtp);
router.post("/login", validate(loginVschema), login);

export default router;