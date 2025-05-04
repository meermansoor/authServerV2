import mongoose from "mongoose";
import { DB_URI , NODE_ENV } from "../config/env.js";
import process from "process";

if(!DB_URI){
    throw new Error("DB_URI is not defined");
}

const connectDB = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`connected to MongoDB at ${NODE_ENV}`);

        }
     catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }

}

export default connectDB;
