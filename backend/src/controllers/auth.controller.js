import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import {ENV} from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { userName, email, password } = req.body; 

  try{
    if(!userName || !email || !password){
      return res.status(400).json({ message: "All fields are required" });
    }
    if(password.length<6){
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
    });

    if(newUser){
      //before codeRabbit
        // generateToken(newUser._id, res);
        // await newUser.save();
      // afetr codeRabbit
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

        res.status(201).json({ 
            id:newUser._id,
            userName:newUser.userName,
            email:newUser.email,
            profilePic:newUser.profilePicture });
      try {
        await sendWelcomeEmail(savedUser.email, savedUser.userName, ENV.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  }
  catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } 
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      id:user._id,
      userName:user.userName,
      email:user.email,
      profilePic:user.profilePicture
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (_, res) => {
  res.cookie("jwt","",{maxAge:0});
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateprofile = async (req, res) => {
  try{
    const {profilePic} = req.body;
    if(!profilePic){
      return res.status(400).json({message:"Profile picture is required"});
    }

    const userId= req.user._id;
    
    const uploadedResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {profilePicture:uploadedResponse.secure_url}, 
      {new:true}
    );
    res.status(200).json({message:"Profile picture updated successfully"});
  } catch(error){
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};