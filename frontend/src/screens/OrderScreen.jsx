import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery, useUpdateOrderToPaidMutation } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Col, Row, ListGroup, Card, Image, Button } from 'react-bootstrap';
import { useDeliverOrderMutation } from '../slices/ordersApiSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {userInfo} = useSelector((state)=> state.auth);
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [updateOrderToPaid, { isLoading: isUpdating, error: updateError }] = useUpdateOrderToPaidMutation();
  const [deliverOrder,{isLoading : deliverLoading}] = useDeliverOrderMutation();
  const payHandler = async () => {
    try {
      await updateOrderToPaid(orderId).unwrap();
      refetch();
      alert('Order updated to paid successfully');
    } catch (err) {
      alert('Error updating order to paid');
    }
  };

  const deliverOrderHandler = async ()=>{
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order Delivered');

    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{order.user.email}
                {/* <a href={`mailto:${order.user.email}`}>{order.user.email}</a> */}
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Items
                  </Col>
                  <Col>
                    ${order.itemsPrice}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    Shipping
                  </Col>
                  <Col>
                    ${order.shippingPrice}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    Tax
                  </Col>
                  <Col>
                    ${order.taxPrice}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    Total
                  </Col>
                  <Col>
                    ${order.totalPrice}
                  </Col>
                </Row>
                {!order.isPaid && (
                  <Button
                    type='button'
                    className='btn-block'
                    // disabled={cart.cartItems === 0}
                    onClick={payHandler}
                  >
                    {isUpdating ? <Loader /> : 'Pay'}
                  </Button>
                )}
              </ListGroup.Item>
              {updateError && (
                <ListGroup.Item>
                  <Message variant='danger'>{updateError.data?.message || updateError.error}</Message>
                </ListGroup.Item>
              )}

              {deliverLoading && <Loader/>}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type = 'button' className='btn btn-block' onClick={deliverOrderHandler}>Mark As Delivered</Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
