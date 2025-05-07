import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";

export const createSubscritpion = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubcription = async (req, res, next) => {
    try {
      if (req.user.id != req.params.id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }
  
      const subscription = await Subscription.find({ user: req.params.id });
  
      return res.status(200).json({ success: true, data: subscription }); // <-- Add return here
    } catch (error) {
      return next(error);
    }
  };

  export const getAllSubscriptions = async (req, res, next) => {

    try {
        const subscriptions = await Subscription.find();
        const userNames = await User.find({}).select('name');

        const subscriptionsWithUsernames = subscriptions.map(subscription => {
            const username = userNames.find(user => user._id.toString() === subscription.user.toString()).name;
            return { username,...subscription._doc };
        });

        res.status(200).json({
            success: true,
            message: "Subscriptions retrieved successfully",
            subscriptions: subscriptionsWithUsernames,
        });

    }catch (error) {
        next(error);
    }
  }