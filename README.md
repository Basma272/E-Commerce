# 🛍 E-Commerce Backend API

This is a full-featured E-Commerce Backend API built using Node.js, Express.js, and MongoDB.  
It includes robust authentication and authorization using JWT, seamless image upload via Cloudinary, and supports PayPal integration for payment processing.

> Ideal for anyone looking to build a real-world MERN stack application or strengthen their portfolio with a production-level backend.

---

## 🛠 What's Included

- 🔐 JWT-based Authentication & Role-based Authorization
- ✅ Email verification using OTP
- 🧾 Advanced product filtering , searching  and Sorting 
- 📤 Cloudinary Image Upload
- 💳 Checkout with multiple payment methods
- 📦 Orders (Create, Track, Finalize)
- 💳 PayPal Payment Integration  
- 🛒 Cart, Checkout, and Order Management
- ⚙️ Clean architecture with error handling & reusable utils
- 🚀 Ready for deployment on Render, Railway, or Heroku

---

## 🔥 Why this project?

- ✅ Real-world architecture
- ✅ Clean, modular codebase
- ✅ Great for interviews & portfolios
- ✅ Scalable & maintainable

---

## 🔗 Live API / Postman Collection

📬 [Open the API Postman Collection](https://www.postman.com/navigation-candidate-47200479/workspace/e-commerce-api-collection/collection/39800840-426d7026-b2c6-4a8d-b497-d5c84d652974?action=share&source=copy-link&creator=39800840)

---

## 🛠 Tech Stack

| Tech        | Description                      |
|-------------|----------------------------------|
| Node.js     | JavaScript runtime               |
| Express.js  | Web framework                    |
| MongoDB     | NoSQL database                   |
| Mongoose    | MongoDB ODM                      |
| JWT         | Auth via JSON Web Tokens         |
| Cloudinary  | Image hosting & CDN              |
| Multer      | File upload middleware           |
| BcryptJS    | Password hashing                 |

---

## 🧪 How to Run

`bash

# 1. Clone the repo
git clone [https://github.com/Basma272/E-Commerce.git]

# 2. Install dependencies
npm install

# 3. Create .env file

PORT=3000
URLDB=
SALT=10
MOOD = "dev"
JWT_SECRET=
EMAIL= 
EMAIL_PASSWORD=""
EXPIRE_TOKEN="7d"
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=I9-

# 4. Start the server
npm run dev


---

📁 Folder Structure

src/
│
├── models/         # Mongoose schemas (User, Product, Order, etc.)
├── controllers/    # API logic
├── routes/         # API route definitions
├── middleware/     # Auth, isAdmin, error handling
├── utils/          # Helpers: OTP, email sender, response formatter
└── config/         # DB connection, cloudinary config


---

 API Endpoints Overview
 Deployed on Railway
 https://e-commerce-production-f63d.up.railway.app/

✅ Auth

Method Route Description

POST /api/auth/signup Register + Send OTP
POST /api/auth/login Login user
POST /api/auth/confirm-email Confirm OTP
POST /api/auth/resend-otp Resend OTP


👤 User

Method Route Description

GET /api/users/profile Get user profile


 Products

Method Route Description

POST /api/products/ Create product
PUT /api/products/:id Update product
DELETE /api/products/:id Delete product
GET /api/products/ Get all products
GET /api/products/:id Get single product


🛒 Cart

Method Route Description

POST /api/cart Add to cart
PUT /api/cart Update cart item
DELETE /api/cart Remove from cart
GET /api/cart Get user cart


💳 Checkout

Method Route Description

POST /api/checkout Create checkout
GET /api/checkout Get current checkout
PUT /api/checkout/:id/pay Confirm payment
POST /api/checkout/:id/finalize Finalize the checkout


📦 Orders

Method Route Description

GET /api/orders Get user orders
GET /api/orders/:id Get single order


upload image
POST /api/upload
---

⚠️ Notes

Product management routes are restricted to Admins

JWT-protected routes using role-based access control

Email verification is required before login

OTPs expire after 10 minutes



---

💡 Possible Future Improvements

Stripe / PayPal integration for real payments

Unit & integration testing (Jest + Supertest)

Redis caching for product data

Wishlist & product reviews

Admin dashboard with analytics



---

👩‍💻 Author

Name: Basma Mahmoud
GitHub: https://github.com/Basma272
LinkedIn: https://www.linkedin.com/in/basmamahmoud-cairo


---

⭐️ Show your support

If you found this project helpful or inspiring, feel free to ⭐️ it on GitHub!
