import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
// Change "router as" to "router from"

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

// Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.get("/home", (req, res) => {
  res.send("hello");
});

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", bookRouter);
app.use("/api/v1/cart", cartRouter);

export default app;
