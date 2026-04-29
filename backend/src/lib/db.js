import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL);
        console.log("MONGODB CONNECTED", conn.connection.host);
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR:", error);
        process.exit(1);
    }
};