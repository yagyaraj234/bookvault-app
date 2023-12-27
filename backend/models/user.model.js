import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const ItemSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new Schema({
  items: {
    type: [ItemSchema],
  },
  total: {
    type: Number,
  },
});

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Password is required"] },

    cartItems: {
      type: [ItemSchema],
    },
    previousOrders: {
      type: [orderSchema],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    var user = this;
    user.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

userSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = model("User", userSchema);
