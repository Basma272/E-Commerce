import express from 'express';
import { verifyToken } from '../middleware/authJwt.js';
import {createCart,
        updateCart ,
        deleteCartItem,
        getCart} from "../controller/catrts.controller.js"
const router = express.Router()

router.post("/", verifyToken, createCart)
router.put("/", verifyToken, updateCart)
router.delete("/", verifyToken, deleteCartItem)
router.get("/", verifyToken, getCart)


export default router