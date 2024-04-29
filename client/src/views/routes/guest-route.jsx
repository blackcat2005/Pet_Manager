import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const GuestRoute = () => {
  return <Outlet />
}

GuestRoute.defaultProps = {
  location: {},
}

export default GuestRoute
