import React from 'react';
// import { useGetOrdersQuery} from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Table, Toast } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../slices/usersApislice';

const UserListScreen = () => {
    const { data: users, isLoading, error,refetch } = useGetUsersQuery();

    // Extract error message if error is an object
     const errorMessage = error?.data?.message || error?.error || error?.toString();

     const [deleteUser,{isLoading:deleteLoading}] = useDeleteUserMutation();
     const deleteHandler = async (id)=>{
        try {
            await deleteUser(id);
            refetch();
        } catch (err) {
            Toast.error(err?.data?.message || err.error)
        }
     }

    return (
        <>
            <h1>Users</h1>
            {deleteLoading && <Loader/>}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{errorMessage}</Message>
            ) : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
            
                        </tr>
                    </thead>
                     <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    'Yes'
                                ) : 'No'}</td>
                                
                                <td>
                                    <Button
                                        as={Link}
                                        to={`/admin/userList/${user._id}/edit`}
                                        variant='light'
                                        className='btn-sm'
                                    >
                                    Edit
                                    </Button>

                                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody> 
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
