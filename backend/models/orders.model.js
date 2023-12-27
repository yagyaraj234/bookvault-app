import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  // ... other order fields
});

const Order = model("Order", orderSchema);
