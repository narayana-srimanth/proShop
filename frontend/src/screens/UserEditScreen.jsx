import React, { useEffect, useState } from 'react'
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../slices/productsApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Form, FormGroup } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useGetUserbyIdQuery, useUpdateUserMutation } from '../slices/usersApislice';

const UserEditScreen = () => {
    const {id : userId} = useParams();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); 

    const navigate = useNavigate();
    const {data : user,isLoading,error,refetch} = useGetUserbyIdQuery(userId);

    const [updateUser,{isLoading:loadingUpdate}] = useUpdateUserMutation();

    const submitHandler = async(e)=>{

        e.preventDefault();
        try {
            await updateUser({userId,name,email,isAdmin});
            toast.success('updated user successfully');
            refetch();
            navigate('/admin/userList');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    

    }

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
        }
    },[user])


  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
      Go Back
    </Link>
    <FormContainer>
      <h1>Edit User</h1>
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

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen

