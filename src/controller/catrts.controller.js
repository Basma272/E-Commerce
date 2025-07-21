import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/respone-Handling.js";
import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";

// ✅ Add to Cart
export const createCart = asyncHandling(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity, size, color } = req.body;

  const product = await ProductModel.findById(productId);
  if (!product) throw new Error("Product not found");

  const productData = {
    productId,
    name: product.name,
    image: product.images[0]?.url,
    price: product.price,
    size,
    color,
    quantity,
  };

  let cart = await CartModel.findOne({ userId });

  if (cart) {
    const existingProduct = cart.products.find(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push(productData);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
  } else {
    cart = await CartModel.create({
      userId,
      products: [productData],
      totalPrice: product.price * quantity,
    });
  }

  return sucssesResponse({
    res,
    message: "🛒 Cart updated successfully",
    data: cart,
  });
});

// ✅ Update Quantity in Cart
export const updateCart = asyncHandling(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity, size, color } = req.body;

  const cart = await CartModel.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  const productIndex = cart.products.findIndex(
    (p) =>
      p.productId.toString() === productId.toString() &&
      p.size.trim().toLowerCase() === size.trim().toLowerCase() &&
      p.color.trim().toLowerCase() === color.trim().toLowerCase()
  );

  if (productIndex === -1) throw new Error("Product not found in cart");

  if (quantity > 0) {
    cart.products[productIndex].quantity = quantity;
  } else {
    cart.products.splice(productIndex, 1);
  }

  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  return sucssesResponse({
    res,
    message: "✅ Product quantity updated",
    data: cart,
  });
});

// ✅ Delete Cart Item
export const deleteCartItem = asyncHandling(async (req, res) => {
  const userId = req.user._id;
  const { productId, size, color } = req.body;

  const cart = await CartModel.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  const productIndex = cart.products.findIndex(
    (item) =>
      item.productId.toString() === productId.toString() &&
      item.size.trim().toLowerCase() === size.trim().toLowerCase() &&
      item.color.trim().toLowerCase() === color.trim().toLowerCase()
  );

  if (productIndex === -1) throw new Error("Product not found in cart");

  cart.products.splice(productIndex, 1);

  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  return sucssesResponse({
    res,
    message: "🗑️ Product removed from cart",
    data: cart,
  });
});

// ✅ Get User Cart
export const getCart = asyncHandling(async (req, res) => {
  const userId = req.user._id;

  const cart = await CartModel.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  return sucssesResponse({
    res,
    message: "🛒 Cart fetched successfully",
    data: cart,
  });
});