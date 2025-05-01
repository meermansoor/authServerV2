import mongoose from "mongoose";

export const signIn =  async (req, res, next) => {
    const session = await mongoose.session();
    session.startTransaction();
    try {
        if

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