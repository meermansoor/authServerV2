import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './database/mongoDB.js';
import errorMiddleWare from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';



const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/subscription/upcomingrenewals', subscriptionRouter);

app.use(errorMiddleWare); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port  https://locahost:${PORT}`);

    connectDB();
});

app.get

export default app;
