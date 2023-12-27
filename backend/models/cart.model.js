import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  book: String,
  title: String,
  author: String,
  image: String,
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
  },
});

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  books: {
    type: [ItemSchema],
    // Reference the model name, not the schema variable name
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
