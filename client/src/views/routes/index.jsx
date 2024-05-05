import loadableComponent from 'utils/loadable-component'
import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import GuestRoute from './guest-route'
import MainLayout from 'components/layouts/MainLayout'
import Register from 'views/pages/register'
import CustomerRoutes from './customer'
import ForgotPassword from 'views/pages/forgot-password/forgot-password'
const InfoPet = loadableComponent(() => import('views/pages/customer/info-pet'))
const Login = loadableComponent(() => import('views/pages/login'))
const PersonalInfo = loadableComponent(
  () => import('views/pages/customer/personal-info'),
)

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'} />}></Route>

      <Route element={<CustomerRoutes />}>
        <Route path="/pet" element={<MainLayout component={InfoPet} />} />
        <Route
          path="/personal-info"
          element={<MainLayout component={PersonalInfo} />}
        />
      </Route>

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Route>

      <Route path="*">404 not found</Route>
    </Routes>
  )
}

export default AllRoutes
