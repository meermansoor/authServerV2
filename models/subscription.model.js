import { Timestamp } from "bson";
import { timeStamp } from "console";
import { validate } from "json-schema";
import mongoose from "mongoose";
import { type } from "os";

const subscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription Fees is required"],
      min: 0,
      max: 1000,
    },
    currency: {
      type: Number,
      enum: ["USD", "PKR", "INR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["sport", "news", "music", "movies", "fitness"],
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "canceled"],
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        messege: "Start date must be in the past",
      },
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) { return value >this.startDate},
          messege: "Renewal date must be in the future",
        },
      },

      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        rquired: true
      }


  },
  { timeStamp: true }
);

subscriptionSchema.pre('save', function () {
  if (!this.renewalDate) {
    const renewalPeriods =  {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

    if (this.renewalDate <= this.startDate) {
      throw new Error("Renewal date must be in the future");
    }
    
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
