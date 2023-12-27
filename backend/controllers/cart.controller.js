import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import Book from "../models/books.model.js";
import CartItem from "../models/cart.model.js";

// Function to calculate total amount based on order items
const calculateTotal = (orderItems) => {
  let total = 0;
  for (const item of orderItems) {
    total += item.quantity * item.price;
  }
  return total;
};

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    // console.log(user.cartItems);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingCartItem = user.cartItems.find(
      (item) => item.book && item.book.toString() === bookId
    );

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      const book = await Book.findById(bookId);

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      user.cartItems.push({
        book: book,
        quantity: 1,
      });
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Item added to cart successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve cart items with book details (assuming cartItems contain book references)
    const cartItems = user.cartItems;

    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const itemIndex = user.cartItems.findIndex(
      (item) => item.book && item.book.toString() === bookId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in the cart" });
    }

    user.cartItems.splice(itemIndex, 1);

    await user.save();

    return res
      .status(200)
      .json({ message: "Item removed from cart successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

const checkout = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.cartItems || user.cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Create a new order object
    const newOrder = {
      items: user.cartItems, // Assign cartItems to the items field of the order
      // You might want to calculate the total for the order here if needed
      // total: calculateTotal(user.cartItems),
    };

    // Push the newOrder object into previousOrders
    user.previousOrders.push(newOrder);

    // Clear cartItems after creating the order
    user.cartItems = [];

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

const getPreviousOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const previousOrders = user.previousOrders;

    return res.status(200).json({ previousOrders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});


export { addToCart, getCartItems, removeFromCart, checkout, getPreviousOrders };
