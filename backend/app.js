import  express from "express";

import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import userRoutes from "./routes/userRoutes.js"
import driverRoutes from "./routes/driverRoutes.js"

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cookie parser middleware
app.use(cookieParser());


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/drivers", driverRoutes);

app.get("/", (req, res) => {
    res.send("API is runnning!!")
});

export default app;