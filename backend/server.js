import express from 'express';
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import exploreRoutes from "./routes/explore.routes.js"
import cors from "cors"
import connectMongoDb from './db/connectMongoDb.js';

import "./passport/github.auth.js"
import passport from 'passport';
import session from 'express-session';

dotenv.config();
const app=express();

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("server is ready");
})

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);

app.listen(5000,()=>{
    console.log('Server started on port 5000');
    connectMongoDb();
})