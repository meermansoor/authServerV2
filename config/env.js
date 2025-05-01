import { config } from "dotenv";
import process from "process";

config({path: `.env.${process.env.NODE_ENV || 'development.local'}`});

export const {PORT, NODE_ENV} = process.env;
export const {DB_URI} = process.env;
export const {JWT_SECRET} = process.env;
export const {JWT_EXPIRES_IN} = process.env;