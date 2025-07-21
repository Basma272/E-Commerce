import mongoose from "mongoose";
import dotenv from "dotenv";
import ConnectDB from "../src/config/db.js";
import { ProductModel } from "../src/models/product.model.js";
import { UserModel } from "../src/models/UserModel.js";
import  products  from "../data/products.js";


// إعداد البيئة وتشغيل الاتصال
dotenv.config();
await ConnectDB();

const seedData = async () => {
  try {
    // حذف البيانات القديمة
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    // إنشاء Admin user
    const adminUser = await UserModel.create({
      username: "Admin User",
      email: "admin@example.com",
      password: "123456",
      phone: "01234567890",
      role: "admin",
      isVerified: true,
    });

    // ربط المنتجات بالـ Admin user
    const sampleProducts = products.map((product) => ({
      ...product,
      idUser: adminUser._id,
    }));

    // إضافة المنتجات
    await ProductModel.insertMany(sampleProducts);

    console.log("✅ Seeding done successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();