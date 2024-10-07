import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect_db } from './config/db';
import userRouter from './routes/user-routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

//database
connect_db().then(() => {
    //routes
    app.use('/api/users', userRouter);

    //start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('error', err);
});



