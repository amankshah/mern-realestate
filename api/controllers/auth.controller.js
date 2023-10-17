import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

let JWT_sec = process.env.JWT_SECRET;
// console.log(JWT_SECRET);

export const signup = async (req, resp, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    resp.status(201).json("User Created Successfully!");
  } catch (error) {
    next(errorHandler(550, "Error from a function"));
  }
};

// export const signin = async (req, resp, next) => {
//   // console.log(req.body);
//   const { email, password } = req.body;

//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, "Invalid Email ")); //or Password
//     const isValidPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!isValidPassword) return next(errorHandler(401, "Wrong Credentials!"));
//     const token = Jwt.sign({ id: validUser._id }, JWT_SECRET);
//     const { password: pass, ...rest } = validUser;
//     resp
//       .cookie("access_Token", token, { httpOnly: true })
//       .sendStatus(200)
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = Jwt.sign({ id: validUser._id }, JWT_sec);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
