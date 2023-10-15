import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";


export const signup = async(req, resp, next)=>{
// console.log(req.body);
const {username, email , password } = req.body;
const hashedPassword = bcryptjs.hashSync(password,10);
const newUser = new User({username , email, password:hashedPassword});
try{
    await newUser.save();
    resp.status(201).json('User Created Successfully!');

}catch(error){
    next(errorHandler(550, 'Error from a function'))
}

};