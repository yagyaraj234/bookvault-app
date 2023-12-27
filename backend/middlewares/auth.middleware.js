import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req?.cookies["ventures-pulse-access-token"] ||
      req.header("Authorization")?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = await Jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid Access");
  }
});

