import { Router } from "express";
const router = Router();

import { getBookList, searchBook } from "../controllers/product.controller.js";

router.get("/", getBookList);

router.get("/search=:key", searchBook);


export default router;
