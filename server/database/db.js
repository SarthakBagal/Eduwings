import mongoose from "mongoose";

export const connectDb=async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Database Connected!'));
    } catch (error) {
        console.log(error);
         process.exit(1); 
    }
}