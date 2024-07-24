import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';


//@desc creating an order
//method POST /api/orders
//access private 

const addOrderItems = asyncHandler(async (req,res)=>{
    const {orderItems,shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice} = req.body;
    if(orderItems && orderItems.length === 0){
        res.send(404);
        throw new Error('No order Items');
    }else{
        const order = new Order({
            orderItems : orderItems.map((x) =>({
                ...x,
                product : x._id,
                _id : undefined
            })),
            user : req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

//@desc get an users orders
//method GET /api/orders/myorders
//access private 

const getMyOrders = asyncHandler(async (req,res)=>{
    const orders = await Order.find({user : req.user._id});
    res.status(200).json(orders);
});

//@desc get an users order by id
//method GET /api/orders/myorders/:id
//access private 

const getOrderById = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404)
        throw new Error('Order not Found');
    }
});

//@desc update an users order by id TO paid
//method PUT /api/orders/myorders/:id/pay
//access private

const updateOrderToPaid = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now();
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            //email_address : req.body.user.email
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }
});

//@desc update an users order by id TO delivered
//method PUT /api/orders/myorders/:id/deliver
//access private /admin

const updateOrderToDelivered = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order is Not Found');
    }
});

//@desc get all orders
//method GET /api/orders
//access private /admin

const getOrders = asyncHandler(async (req,res)=>{
    const orders = await Order.find({}).populate('user','id name');
    res.status(200).json(orders);
});


export {
    updateOrderToDelivered,
    updateOrderToPaid,
    getMyOrders,
    getOrderById,
    getOrders,
    addOrderItems
};
