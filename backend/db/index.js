import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const dbConnect = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

    console.log(`Connection success ${res.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to Db`, error);
  }
};

export default dbConnect;
