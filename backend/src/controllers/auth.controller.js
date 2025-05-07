import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body
    try{

        if (!fullName || !email || !password){
            return res.status(400).json({message:"All fields must not be empty"})
        }
        //hashing 
        if (password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        
        const user = await User.findOne({email})

        if (user) return res.status(400).json({message:"Email alredy exists"});

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if (newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({message:"Invalid user Data"})
        }

    }catch (e){
        console.log("Error in signup",e.message)
        res.status(500).json({message:"Internal Server error"})
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body
    
    try {
        //check email
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        //check password
        const isCorrectPasword = await bcrypt.compare(password,user.password)
        if (!isCorrectPasword){
            return res.status(400).json({message:"Invalid credentials"})
        }

        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log("Error in Login",error.message)
        res.status(500).json({message:"Internal Server error"})
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("token","",{maxAge:0})
        res.status(200).json({message:"Logged Out sucessfully"})
    } catch (error) {
        console.log("Error in logout",error.message)
        res.status(500).json({message:"Internal Server error"})
    }
}  

export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: profilePic },
        { new: true, select: "-password" }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("Error in update profile", error.message);
      res.status(500).json({ message: "Internal Server error" });
    }
  };

export const checkAuth = async (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller"+error.message)
        res.status(500).json({message:"Internal server error"})
    }
}