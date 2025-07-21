import express from "express";
import { verifyToken } from '../middleware/authJwt.js';
import {getOrders, getOrderDetails } from "../controller/order.controller.js"
const router = express.Router();

router.get("/", verifyToken , getOrders)
router.get("/:id", verifyToken , getOrderDetails)


export default router
