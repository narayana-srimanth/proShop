import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Header/>
      <div style={{margin : "20px"}}>
        <Outlet/>
      </div>
      
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App

