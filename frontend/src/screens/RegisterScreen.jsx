import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form,Button,Row,Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {  useRegisterMutation } from '../slices/usersApislice'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'
const RegisterScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo}  = useSelector((state)=>state.auth);
    const [register,{isLoading}] = useRegisterMutation();
    

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,redirect,navigate]);

    const submitHandler = async(e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error('Passowrds do not match');
            return;
        }else{
            try {
                const res = await register({name,email,password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
        
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-3'>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control
                    placeholder='Name'
                    type='text'
                    value = {name}
                    onChange={(e)=> setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control
                    placeholder='Email Address'
                    type='email'
                    value = {email}
                    onChange={(e)=> setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control
                    placeholder='Password'
                    type='password'
                    value = {password}
                    onChange={(e)=> setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-3'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control
                    placeholder='Confirm Password'
                    type='password'
                    value = {confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>Register</Button>

            {isLoading && <Loader/>}
        </Form>

        <Row>
            <Col>
                Already Have an Account? <Link to= {redirect ? `/login?redirect=${redirect}` : '/login'}>Register</Link>
            </Col>
        </Row>



    </FormContainer>
  )
}

export default RegisterScreen
