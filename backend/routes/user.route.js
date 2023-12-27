import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  orderHistory,
  cartItems,
  addToCart
} from "../controllers/user.controller.js";

router.post("/register", registerUser);
router.post("/login", loginUser);

// secured routes
router.post("/logout", verifyJWT, logoutUser);

router.get("/orders", verifyJWT, orderHistory);
router.post("/cart", verifyJWT, cartItems);
router.post("/addToCart", verifyJWT, addToCart);

export default router;
