import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

import {
  addToCart,
  getCartItems,
  removeFromCart,
  checkout,
  getPreviousOrders,
} from "../controllers/cart.controller.js";

router.get("/", verifyJWT, getCartItems);

router.post("/addToCart", verifyJWT, addToCart);
router.post("/removeFromCart", verifyJWT, removeFromCart);
router.post("/checkout", verifyJWT, checkout);
router.get("/orders", verifyJWT, getPreviousOrders);

export default router;
