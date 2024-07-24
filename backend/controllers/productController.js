import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


const getProducts = asyncHandler(async (req,res)=>{
    
    const products = await Product.find({});
    res.json(products);

});

const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        return res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource not Found!');
    }

});

//@desc Create a Product
//@route POST /api/product
//@access private/admin

const createProduct = asyncHandler(async (req,res)=>{
    const product = new Product({
        name : 'Sample Product',
        user : req.user._id,
        price : 0,
        image : '/images/sample.jpg',
        brand : 'sample brand',
        category : 'sample category',
        countInStock : 0,
        numReviews : 0,
        description : 'sample description'
    });

    const createdProduct = await product.save();
    res.status(200).json(createProduct);
})


//@desc edit a Product
//@route PUT /api/product/:id
//@access private/admin

const updateProduct = asyncHandler(async (req,res)=>{
    const {name ,
        image ,
        brand ,
        category ,
        countInStock ,
        description,price } = req.body;
        //const id = req.params();
        const product = await Product.findById(req.params.id);
        if(product){
            product.name = name;
            product.brand = brand;
            product.image = image;
            product.category = category;
            product. description =  description;
            product.price = price;
            product.countInStock = countInStock;

            const updatedProduct = await product.save();
            res.json(updateProduct);
        }else{
            res.status(404);
            throw new Error('Product not Found');
        }
})


//@desc delete a Product
//@route DELETE /api/product/:id
//@access private/admin

const deleteProduct = asyncHandler(async (req,res)=>{
    //const deletedProduct = await Product.deleteOne({_id : req.params.id});
    const product = await Product.findById(req.params.id);
    if(product){
        await Product.deleteOne({_id : product._id});
        res.status(200).json({
            message : 'product removed'
        });
    }else{
        res.status(404);
        throw new Error('item not Found');
    }
})


export {getProductById,getProducts,createProduct,updateProduct,deleteProduct};