import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

export const signIn =  async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        //logic to Create New User
        const {name, email, password} = req.body;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error("User already exists");
            error.statusCode = 422;
            throw error;

        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{name, email,password: hashedPassword}], {session});

        const token = jwt.sign({userId: newUser[0]._id,}, process.env.JWT_SECRET, process.env.JWT_EXPIRATION); 

        

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            User: newUser[0],
            token,
        });

    }catch(error){
        session.abortTransaction();
        session.endSession();
        next(error);
    }    

};

export const signUp = (req, res, next) => {

};

export const signOut = (req, res, next) => {

};