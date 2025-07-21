import express from "express";
import { verifyToken } from "../middleware/authJwt.js";
import { profile } from "../controller/user.controller.js";
const router = express.Router()

router.get("/profile", verifyToken, profile)

export default router