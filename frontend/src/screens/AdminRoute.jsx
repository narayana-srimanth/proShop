import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

import React from 'react'

const AdminRoute = () => {
    const {userInfo} = useSelector((state) => state.auth );
  return (
    userInfo && userInfo.isAdmin ? <Outlet/> : <Navigate to ='/login' replace/>
  )
}

export default AdminRoute
