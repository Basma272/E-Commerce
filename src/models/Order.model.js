import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  name: String,
  image: String,
  size: String,
  color: String,
  price: Number,
  quantity: Number,
});

const shippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });


const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  orderItems: {
    type: [orderItemSchema],
    required: true,
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cash", "paypal", "card"],
    default: "cash",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  paymentDetails: mongoose.Schema.Types.Mixed,

  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: Date,

  totalPrice: {
    type: Number,
    required: true,
  },


}, { timestamps: true });

export const OrderModel = mongoose.model("order", orderSchema);