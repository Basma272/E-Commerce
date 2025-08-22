import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js"
import productRoutes from "./src/routes/product.routes.js";
import cartsRoutes from "./src/routes/carts.routes.js"
import checkoutRoutes from "./src/routes/checkout.routes.js"
import orderRoutes from "./src/routes/order.routes.js"
import uploadRoutes from "./src/routes/upload.Routes.js"

import { GlobalErrorHandler } from "./src/utils/error-Handling.js";

dotenv.config();
ConnectDB();

const app = express();
app.use(express.json());

//  API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes );
app.use("/api/upload", uploadRoutes );




//  Test Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Our E-Commerce API!");
});

//  Global Error Handler
app.use(GlobalErrorHandler);

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
