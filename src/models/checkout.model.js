import mongoose from "mongoose"

const checkoutItemSchema = new mongoose.Schema({
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
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

const checkoutSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  checkoutItems: {
    type: [checkoutItemSchema],
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
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  isFinalized: {
    type: Boolean,
    default: false,
  },
  finalizedAt: Date,
}, { timestamps: true });

export const CheckoutModel = mongoose.model("checkout", checkoutSchema);