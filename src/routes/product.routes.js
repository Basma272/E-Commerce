import express from "express"
import {verifyToken , isAdmin} from "../middleware/authJwt.js"
import {createProduct,
        updateProduct, 
        deleteProduct,
        getAllProducts, 
        getProductById } from "../controller/product.controller.js"
const router = express.Router();

router.post('/', verifyToken, isAdmin, createProduct)
router.put('/:id', verifyToken, isAdmin, updateProduct)
router.delete('/:id', verifyToken, isAdmin, deleteProduct)
router.get('/', verifyToken, getAllProducts)
router.get('/:id', verifyToken, getProductById)


export default router