import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB Atlas
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(error);
        console.log("Mongoose Error")
    }
}

export default connectDB;