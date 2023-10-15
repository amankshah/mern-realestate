import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';


export const signup = async(req, resp)=>{
// console.log(req.body);
const {username, email , password } = req.body;
const hashedPassword = bcryptjs.hashSync(password,10);
const newUser = new User({username , email, password:hashedPassword});
try{
    await newUser.save();
    resp.status(201).json('User Created Successfully!');

}catch(error){
    resp.status(500).json(error.message);
}

};