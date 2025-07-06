import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DataBase connected Successfully");
    } catch (error) {
        console.error("Error in connecting database");
        process.exit(1);
    }
}