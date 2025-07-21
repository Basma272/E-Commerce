import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/respone-Handling.js";
import { ProductModel } from "../models/product.model.js";

// ✅ Create Product
export const createProduct = asyncHandling(async (req, res) => {
  const idUser = req.user._id;

  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    images,
    gender,
    sku,
    dimensions,
    isFeatured,
    isPublished,
    tags,
    weight,
  } = req.body;

  const product = await ProductModel.create({
    name,
    description,
    price,
    discountPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    images,
    gender,
    sku,
    dimensions,
    isFeatured,
    isPublished,
    tags,
    weight,
    idUser,
  });

  return sucssesResponse({
    res,
    message: "✅ Product added successfully",
    data: product,
  });
});

// ✅ Update Product
export const updateProduct = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findOneAndUpdate(
    { _id: id, idUser: req.user.id },
    req.body,
    { new: true }
  );

  if (!product) {
    throw new Error("❌ Product not found");
  }

  return sucssesResponse({
    res,
    message: "✅ Product updated successfully",
    data: product,
  });
});

// ✅ Delete Product
export const deleteProduct = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findOneAndDelete({
    _id: id,
    idUser: req.user.id,
  });

  if (!product) {
    throw new Error("❌ Product not found");
  }

  return sucssesResponse({
    res,
    message: "🗑️ Product deleted successfully",
  });
});

// ✅ Get All Products with Filters
export const getAllProducts = asyncHandling(async (req, res) => {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    brand,
    gender,
    colors,
    sizes,
  } = req.query;

  const filter = {};

  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }
  if (category) {
    filter.category = category;
  }
  if (brand) {
    filter.brand = brand;
  }
  if (gender) {
    filter.gender = gender;
  }
  if (colors) {
    filter.colors = { $in: [colors] };
  }
  if (sizes) {
    filter.sizes = { $in: [sizes] };
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const products = await ProductModel.find(filter);

  return sucssesResponse({
    res,
    message: "✅ All products fetched",
    data: products,
  });
});

// ✅ Get Product by ID
export const getProductById = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error("❌ Product not found");
  }

  return sucssesResponse({
    res,
    message: "✅ Product fetched successfully",
    data: product,
  });
});