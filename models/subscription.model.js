import { Timestamp } from "bson";
import { timeStamp } from "console";
import mongoose  from "mongoose";
import { type } from "os";

const subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'Subscription Fees is required'],
        min: 0,
        max: 1000
    },
    currency: {
        type: Number,
        enum: ['USD', 'PKR', 'INR'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sport', 'news', 'music', 'movies', 'fitness'] 
    }
}, { timeStamp: true });
