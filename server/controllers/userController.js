import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Resume from "../Models/ResumeModel.js";


const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn : "7d"});
    return token;
}

export const getUserById = async (req,res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({message : "User not found"});
        }

        user.password = undefined;
        return res.status(200).json({
            message : "User fetched successfully",
            user});

    } catch (error) {
        return res.status(500).json({message : "Server error in get user by id"});
    }
}

// controller for user registration and login

// POST : /api/users/register
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // validate the input
        if(!name || !email || !password) {
            return res.status(400).json({message : "Please fill all the fields"});
        }

        // check if user already exists

        const user = await User.findOne({email});

        if(user) {
            return res.status(400).json({message : "User already exists"});
        }

        // create new user
        const hashedPassword  = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password : hashedPassword,
        })


        // generate token
        const token = generateToken(newUser._id);

        newUser.password = undefined;

        return res.status(201).json({
            message : "User registered successfully",
            user : newUser,
            token
        })
    } catch (error) {
        return res.status(500).json({message : "Server error in registration"});
    }
}

// POST : /api/users/login
export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        // validate the input
        if(!email || !password) {
            return res.status(400).json({message : "Please fill all the fields"});
        }

        // check if user exists
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                message : "user does not exist"
            })
        }

        // compare password
        const isMatch = user.comparePassword(password);
        
        if(!isMatch) {
            return res.status(400).json({
                message : "Invalid credentials"
            })
        }

        const token = generateToken(user._id);

        user.password = undefined;

        return res.status(201).json({
            message : "User logged in successfully",
            user : user,
            token
        })

    } catch (error) {
        return res.status(500).json({message : "Server error in login"});
    }

}

// controller for getting user resumes
// GET : /api/users/resumes 

export const getUserResumes = async (req,res) => {
    try {
        const userId = req.userId;

        if(!userId) {
            return res.status(401).json({message : "Unauthorized, no user id provided"});
        }

        const resumes = await Resume.find({ userId });
        
        return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(500).json({message : "Server error in get user resumes"});
    } 
}