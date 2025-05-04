import mongoose from "mongoose";

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
      type: String,
      enum: ["USD", "PKR", "INR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["Entertainment", "news", "music", "movies", "fitness"],
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
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
        type: Date,
        required: false,
        validate: {
          validator: function (value) { return value >this.startDate},
          messege: "Renewal date must be in the future",
        },
      },

      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }


  },
  { timestamp: true }
);

subscriptionSchema.pre('save', function (next) {
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
