import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/respone-Handling.js";
import { CartModel } from "../models/cart.model.js";
import { CheckoutModel } from "../models/checkout.model.js";
import { OrderModel } from "../models/Order.model.js";

// ✅ Create Checkout
export const createCheckout = asyncHandling(async (req, res) => {
  const userId = req.user._id;
  const { shippingAddress, paymentMethod } = req.body;

  const cart = await CartModel.findOne({ userId });
  if (!cart || cart.products.length === 0) {
    throw new Error("Cart is empty or not found");
  }

  const checkoutItems = cart.products.map((item) => ({
    productId: item.productId,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  }));

  const totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const checkout = await CheckoutModel.create({
    userId,
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  return sucssesResponse({
    res,
    message: "✅ Checkout created successfully",
    data: checkout,
  });
});

// ✅ Pay Checkout
export const pay = asyncHandling(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { paymentDetails, paymentStatus } = req.body;

  const checkout = await CheckoutModel.findById(id);
  if (!checkout) throw new Error("Checkout not found");

  if (paymentStatus === "paid") {
    checkout.paymentStatus = paymentStatus;
    checkout.paymentDetails = paymentDetails;
    checkout.isPaid = true;
    checkout.paidAt = Date.now();
    await checkout.save();
  }

  return sucssesResponse({
    res,
    message: "✅ Payment completed successfully",
    data: checkout,
  });
});

// ✅ Finalize Checkout into Order
export const finalizeCheckout = asyncHandling(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const checkout = await CheckoutModel.findById(id);
  if (!checkout) throw new Error("Checkout not found");
  if (!checkout.isPaid) throw new Error("❌ Payment not completed yet");
  if (checkout.isFinalized) throw new Error("✅ Checkout already finalized");

  const finalOrder = await OrderModel.create({
    userId,
    orderItems: checkout.checkoutItems,
    shippingAddress: checkout.shippingAddress,
    paymentMethod: checkout.paymentMethod,
    paymentStatus: "paid",
    isPaid: true,
    paidAt: checkout.paidAt,
    isDelivered: false,
    totalPrice: checkout.totalPrice,
    paymentDetails: checkout.paymentDetails,
  });

  checkout.isFinalized = true;
  checkout.finalizedAt = Date.now();
  await checkout.save();

  await CartModel.deleteOne({ userId });

  return sucssesResponse({
    res,
    message: "✅ Order finalized successfully",
    data: finalOrder,
  });
});

// ✅ Get Current User Checkout
export const getCheckout = asyncHandling(async (req, res) => {
  const checkout = await CheckoutModel.findOne({ userId: req.user._id });
  if (!checkout) throw new Error("Checkout not found for this user");

  return sucssesResponse({
    res,
    message: "✅ Checkout fetched successfully",
    data: checkout,
  });
});