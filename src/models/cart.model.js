// models/cart.model.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
    name: String,
    image: String,
    price: String,
    size: String,
    color: String,

  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
},{_id:false});


const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

    },
    products: [cartItemSchema],

    totalPrice: {
      type: Number,
      required: true,
      default:0,
    }
  },
  { timestamps: true }
);

export const CartModel = mongoose.model("cart", cartSchema);