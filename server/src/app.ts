import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../src/config/db';
import userRoutes from '../src/routes/user/userRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

//DB connection
connectDB();

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRoutes);
//error hanlding middleware
app.use(errorMiddleware);

const port : number | string = process.env.PORT || 5000;

app.listen(port,()=>console.log(`server started at port ${port}`));
