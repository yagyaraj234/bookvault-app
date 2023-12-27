import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import Book from "../models/books.model.js";
import Cart from "../models/cart.model.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log(user);
    const accessToken = await user.generateAccessToken();
    console.log({ accessToken });
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    let newk = await user.save({ validateBeforeSave: false });
    console.log({ user, newk });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while genrating token ");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((val) => val?.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const checkUserExistence = await User.findOne({ email });

  if (checkUserExistence) {
    throw new ApiError(409, "User already registered with this email.");
  }
  const user = await User.create({
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    if (!email) {
      throw new ApiError(400, "Email is required");
    } else if (!password) {
      throw new ApiError(400, "Password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(409, "Email is not registered.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new ApiError(401, "Password does not match.");
    }

    // generate refresh and access token

    const { accessToken, refreshToken } = await generateToken(user._id);
    // send with cookies
    console.log({ accessToken, refreshToken });

    const loggedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("ventures-pulse-access-token", accessToken, options)
      .cookie("ventures-pulse-refresh-token", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedUser,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          "Logged In"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, { user: "hee" }, "Something went wrong"));
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(
      userId,
      { $set: { refreshToken: "" } },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("ventures-pulse-access-token", options)
      .clearCookie("ventures-pulse-refresh-token", options)
      .json(new ApiResponse(200, {}, "User logged Out"));
  } catch (error) {
    throw new ApiError(400, "Something went wrong");
  }
});

const addToCart = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookName, publisher, amount, author, imageUri } = req.body;

    const user = await User.findById(userId);
    let book = await Book.findOne({ name: bookName });

    if (!book) {
      // If the book doesn't exist, create it and add it to the user's cart with a default quantity of 1
      const newBook = await Book.create({
        name: bookName,
        author,
        price: amount,
        publisher,
        imageUri,
      });

      user.cart.push({ book: newBook._id, quantity: 1 }); // Add the new book to the user's cart with quantity 1
      await user.save();
    } else {
      // If the book already exists, find it in the cart
      const existingCartItem = user.cart.find((item) =>
        item.book.equals(book._id)
      );

      if (existingCartItem) {
        // If the book is in the cart, increase its quantity by one
        existingCartItem.quantity += 1;
      } else {
        // If the book is not in the cart, add it with a default quantity of 1
        user.cart.push({ book: book._id, quantity: 1 });
      }
      await user.save();
    }

    return new ApiResponse(200, user, "Cart Items");
  } catch (error) {
    throw new ApiError(400, "Failed to add cart item", error);
  }
});

const orderHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the request

    // Find the user and populate the orders
    const user = await User.findById(userId).populate("orders");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ orders: user.orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch order history", error: error.message });
  }
});

const cartItems = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the request

    // Find the user and populate the cart
    const user = await User.findById(userId).populate("cart.book");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch cart items", error: error.message });
  }
});


// API endpoint for checking out cart items and adding them to order history
const checkOut = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Retrieve the user and populate the cart with book details
    const user = await User.findById(userId).populate("cart.book");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the cart items from the user's cart
    const cartItems = user.cart;

    // Create an order and populate it with cart items
    const orderItems = cartItems.map((cartItem) => ({
      book: cartItem.book._id,
      quantity: cartItem.quantity,
      // Include other details from cartItem if needed
    }));

    const totalAmount = calculateTotalAmount(cartItems); // Implement a function to calculate total amount

    // Create the order using the Order model
    const newOrder = await Order.create({
      items: orderItems,
      totalAmount,
      // Include other details for the order if needed
    });

    // Add the newly created order to the user's order history
    user.orders.push(newOrder._id);

    // Clear the user's cart after checkout
    user.cart = [];

    // Save the changes to the user
    await user.save();

    return res
      .status(200)
      .json({ message: "Checkout successful", order: newOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to checkout", error: error.message });
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  orderHistory,
  cartItems,
  addToCart,
  checkOut,
};
