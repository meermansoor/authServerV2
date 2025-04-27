import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './database/mongoDB.js';




const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/subscription/upcomingrenewals', subscriptionRouter);


app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port  https://locahost:${PORT}`);

    connectDB();
});

app.get

export default app;
