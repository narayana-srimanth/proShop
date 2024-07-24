import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRoutes from './routes/orderRoutes.js';

connectDB();//connects the mongoose to DB

const app = express();

//body parser middle ware

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie parser middleware

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Api is running');
})

app.use('/api/products',productRouter);

app.use('/api/users',userRouter);

app.use('/api/orders',orderRouter);

app.use('/api/upload',uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})