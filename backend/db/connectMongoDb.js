import mongoose from "mongoose";

export default async function connectMongoDb()
{
   try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("Database Connection established");
   } catch (error) {
     console.log("Error connecting to MongoDb",error.message);
   }
}