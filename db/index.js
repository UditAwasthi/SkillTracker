import mongoose from "mongoose";

const connectDB = async (URL) => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected successfully");

    }
    catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export { connectDB };