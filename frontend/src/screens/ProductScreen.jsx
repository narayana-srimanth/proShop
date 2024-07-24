import React from 'react';
import { Link, useParams,useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { Col, Form, ListGroup, Row } from 'react-bootstrap';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty,setQty] = useState(1);
  const addToCartHandler = ()=>{
    dispatch(addToCart({...product,qty}));
    navigate('/cart');
  }



  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <Message variant='danger'>{error?.data?.message || error.error}</Message>;
  }

  return (
    <>
      <Link className="btn btn-outline-secondary" to="/" style={{ margin: "3vh 3vw" }} role="button">Go Back</Link>
      <div className="d-flex flex-row mb-3">
        <div className="p-2">
          <div className="card mb-3" style={{ width: "30vw", margin: "0px 30px" }}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="p-2 align-self-center">
          <div className="card border-secondary" style={{ width: '18rem' }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price: ${product.price}</li>
              <li className="list-group-item">Status: {product.countInStock > 0 ? "In Stock" : "Not in Stock"}</li>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                    <Form.Control as='select'
                    value={qty}
                    onChange={(e)=> setQty(Number(e.target.value))}>
                      {[...Array(product.countInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1}>{x+1} </option>
                      ))}</Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <li className="list-group-item">
                <button type="button" className="btn btn-outline-success" disabled={product.countInStock === 0}
                   onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
