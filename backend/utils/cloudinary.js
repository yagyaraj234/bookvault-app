// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
import fs from 'fs'
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (filePath) => {
  try {
    if (!filePath) return null;
    // upload on cloudinary
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(filePath);
    return res;
  } catch (err) {
    fs.unlinkSync(filePath); // removing from local server

    return null;
  }
};

export default cloudinaryUpload;
