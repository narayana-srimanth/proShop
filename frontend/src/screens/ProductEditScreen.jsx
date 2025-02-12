import React, { useEffect, useState } from 'react'
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../slices/productsApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Form, FormGroup } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductEditScreen = () => {
    const {id : productId} = useParams();
    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const navigate = useNavigate();
    const {data : product,isLoading,error} = useGetProductDetailsQuery(productId);

    const [updateProduct,{isLoading:loadingUpdate}] = useUpdateProductMutation();

    const [uploadProductImage,{isLoading : loadingUpload}] = useUploadProductImageMutation();

    //const [deleteProduct,{isLoading : loadingDelete}] = useDeleteProductMutation();

    const submitHandler = async(e)=>{

        e.preventDefault();
            const updatedProduct = {
                productId,
                name,price,description,brand,category,countInStock,image
            }
            const result = await updateProduct(updatedProduct);
            if(result.error){
                toast.error(result.error)
            }else{
                toast.success("product Updated");
                navigate('/admin/productList');
            }

    }

    const uploadFileHandler = async (e)=>{
      const formData = new FormData();
      //console.log(e.target.files[0]);
      formData.append('image',e.target.files[0]);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        //toast.error('hiii');
      }
    }

    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    },[product])


  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>
      Go Back
    </Link>
    <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>

            <Form.Label>Image</Form.Label>
            <Form.Control type='text'
              placeholder='Enter Image url'
              value = {image}
              onChange={(e)=>setImage(e.target.value)}
            ></Form.Control>

            <Form.Control type='file' label = 'Choose file'
              onChange={uploadFileHandler}
            >
            </Form.Control>




          </Form.Group> 

          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            style={{ marginTop: '1rem' }}
          >
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  </>
  )
}

export default ProductEditScreen
