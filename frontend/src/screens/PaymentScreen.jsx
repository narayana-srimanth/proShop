import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckOutSteps';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const [paymentMathod,setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state)=>state.cart);
    const {shippingAddress} = cart;
    useEffect(()=>{
      if(!shippingAddress){
        navigate('/shipping');
      }
    },[navigate]);

    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMathod));
      console.log('hi');
      navigate('/placeorder');
    }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment methods</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                    type='radio'
                    className='my-2'
                    label = 'payPal or CreditCard'
                    id = 'PayPal'
                    name = 'paymentMethod'
                    value= 'payPal'
                    checked 
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                />

            </Col>
        </Form.Group>
        <Button type='submit' variant='primary' >Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
