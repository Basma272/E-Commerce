import express from "express";

import { createCheckout,
      finalizeCheckout,
       getCheckout, 
       pay
    } from "../controller/checkOut.controller.js";
import { verifyToken } from '../middleware/authJwt.js';

const router = express.Router();

router.post("/",verifyToken, createCheckout)
router.get("/",verifyToken, getCheckout)
router.put("/:id/pay",verifyToken, pay)
router.put("/:id/finalize",verifyToken, finalizeCheckout)





export default router