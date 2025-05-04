import Subscription from "../models/subscription.model.js";


export const createSubscritpion = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({success:true , data: subscription });
    } catch (error) {
        next(error);
        
    }
}


export const getUserSubcription = async (req, res ,next) =>
{
    try {
        
    } catch (error) {
        next(error);
        
    }
}