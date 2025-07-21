import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const roles = {
  Customer: "customer",
  Admin: "admin",
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      trim: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required"],
    },
    otp: String,
    otpExpires: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    // taskCount: {
    //   type: Number,
    //   default: 0,
    // },
    role: {
      type: String,
      enum: Object.values(roles),
      default:roles.Customer,
      required: [true, "Role is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//  Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//  Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//  Cascade delete user's tasks when user is deleted
userSchema.pre("deleteOne", { document: true }, async function (next) {
  await TaskModel.deleteMany({ idUser: this._id });
  next();
});

// Export model
export const UserModel = mongoose.model("user", userSchema);