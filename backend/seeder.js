import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async ()=>{
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product)=>{
            return {...product,user : adminUser}
        });
        const createdProducts = await Product.insertMany(sampleProducts);

        console.log('data imported');
        process.exit();
    } catch (error) {
        console.log(`Error importing : ${error}`);
        process.exit(1);
    }
}

const destroyData = async ()=>{
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('data destroyed');
        process.exit();
    } catch (error) {
        console.log(`Error destroying : ${error}`);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}
