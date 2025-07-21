import { OrderModel } from "../models/Order.model.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/respone-Handling.js";

// ✅ Get all orders of the current user
export const getOrders = asyncHandling(async (req, res) => {
  const userId = req.user._id;

  const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    throw new Error("No orders found for this user");
  }

  return sucssesResponse({
    res,
    message: "✅ Orders fetched successfully",
    data: orders,
  });
});

// ✅ Get order details by ID
export const getOrderDetails = asyncHandling(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const order = await OrderModel.findOne({ _id: id, userId }).populate("userId");

  if (!order) {
    throw new Error("Order not found");
  }

  return sucssesResponse({
    res,
    message: "✅ Order details fetched successfully",
    data: order,
  });
});