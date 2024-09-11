import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [30, "Name should be less than 30 characters"],
    minLength: [3, "Name should be more than 2 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: Number,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  address: {
    type: String,
    minLength: 5,
  },
  avatar: {
    public_id: { type: String },
    url: { type: String },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = uuid();

  this.resetPasswordToken = await bcrypt.hash(resetToken, 10);
  this.resetPAsswordExpire = Date.now + 15 * 60 * 1000;

  return resetToken;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
