import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Book from "../models/books.model.js";

const getBookList = asyncHandler(async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = (page - 1) * 10;
    const data = await Book.find().skip(skip).limit(limit);
    return res.status(200).json(new ApiResponse(200, data, "Success"));
  } catch (error) {
    throw new ApiError(400, "Something went wrong.");
  }
});

const searchBook = asyncHandler(async (req, res) => {
  try {
    let param = req.params.key;
    console.log(param);

    const books = await Book.find({
      $or: [
        { "volumeInfo.title": { $regex: new RegExp(param, "i") } },
        { "volumeInfo.publisher": { $regex: new RegExp(param, "i") } },
        { "volumeInfo.authors[0]": { $regex: new RegExp(param, "i") } },
        { "searchInfo.textSnippet": { $regex: new RegExp(param, "i") } },
        { "volumeInfo.categories[0]": { $regex: new RegExp(param, "i") } },
        { "volumeInfo.categories[0]": { $regex: new RegExp(param, "i") } },
      ],
    });
    console.log( books )

    return res.json({ books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

export { searchBook, getBookList };
