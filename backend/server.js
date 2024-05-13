import express from 'express';
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import exploreRoutes from "./routes/explore.routes.js"
import cors from "cors"

dotenv.config();
const app=express();

app.use(cors());

app.get("/",(req,res)=>{
    res.send("server is ready");
})

app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);

app.listen(5000,()=>{
    console.log('Server started on port 5000');
})