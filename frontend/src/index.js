import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Provider } from 'react-redux';
import store from './store';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './screens/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './screens/AdminRoute';
import OrderListScreen from './screens/OrderListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<App/>}>
      <Route index = {true} path = "/" element = {<HomeScreen/>}/>
      <Route path='/product/:id' element = {<ProductScreen/>} />
      <Route path = '/cart' element = {<CartScreen/>}/>
      <Route path='/login' element = {<LoginScreen></LoginScreen>}/>
      <Route path='/register' element = {<RegisterScreen/>}/>
      

      <Route path='/' element = {<PrivateRoute/>}>
        <Route path='/shipping' element = {<ShippingScreen/>}/>
        <Route path='/payment' element = {<PaymentScreen/>}/>
        <Route path = '/placeorder' element = {<PlaceOrderScreen/>}/>
        <Route path='/order/:id' element = {<OrderScreen/>}/>
        <Route path = '/profile' element = {<ProfileScreen/>}/>
      </Route>

      <Route path='' element = {<AdminRoute/>}>
        <Route path = '/admin/orderlist' element = {<OrderListScreen/>}/>
        <Route path='/admin/productList' element = {<ProductListScreen/>}/>
        <Route path='/admin/product/:id/edit' element = {<ProductEditScreen/>}/>
        <Route path='/admin/userList' element = {<UserListScreen/>}/>
        <Route path='/admin/userList/:id/edit' element = {<UserEditScreen/>}/>
      </Route>
      
    </Route>
  )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);

reportWebVitals();
