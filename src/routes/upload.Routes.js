import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
import { asyncHandling } from "../utils/error-Handling.js";

dotenv.config();
const router = express.Router();
console.log(process.env.CLOUDINARY_CLOUD_NAME)
// إعدادات Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// إعداد Multer لتخزين الصورة في الذاكرة
const storage = multer.memoryStorage();
const upload = multer({ storage });

// دالة رفع باستخدام Stream
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// الراوت الأساسي لرفع الصورة
router.post(
  "/",
  upload.single("image"),
  asyncHandling(async (req, res) => {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const result = await streamUpload(req.file.buffer);

    res.json({
      success: true,
      imageUrl: result.secure_url,
    });
  })
);

export default router;