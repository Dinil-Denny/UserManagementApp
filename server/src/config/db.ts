import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '' ; 

const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("DB connected");
    }catch(err){
        console.log(`Error in connection to DB: ${(err as Error).message}`, err);
        process.exit(1);// Stop the server if DB fails
    }
}

export default connectDB;