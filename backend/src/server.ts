import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect_db } from './config/db';
import userRouter from './routes/user-routes';
import adminRouter from './routes/admin-routes';
import flightRouter from './routes/flight-routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors({
    origin: 'https://frontend-production-391a.up.railway.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
}));
app.use(express.json());

//database
connect_db().then(() => {
    //routes
    app.use('/api/user', userRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/flights', flightRouter);

    //start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('error', err);
});



