import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

let MongoUrl = process.env.MONGO_URL;
let port = 3001;

// console.log("env value :", process.env.MONGO_URL);

// mongoose.connect(process.env.MONGO).then(()=>{
mongoose
  .connect(MongoUrl)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });
const app = express();
app.use(express.json());

app.use(cookieParser());

app.listen(port, () => {
  console.log("Server is running on port", port);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//Middleware

app.use((err, req, resp, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return resp.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
