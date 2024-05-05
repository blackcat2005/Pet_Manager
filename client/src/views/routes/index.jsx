import loadableComponent from 'utils/loadable-component'
import React from 'react'
import Spinner from 'components/spinner';
import { Navigate, Routes, Route } from 'react-router-dom'
import { Suspense } from "react";
import MainLayout from 'components/layouts/MainLayout'
import Register from 'views/pages/register'
import ForgotPassword from 'views/pages/forgot-password/forgot-password'
import { CustomerRoutes } from './customer';
import { Rings } from 'react-loader-spinner';

const InfoPet = loadableComponent(() => import('views/pages/customer/info-pet'))
const Login = loadableComponent(() => import('views/pages/login'))
const PersonalInfo = loadableComponent(
  () => import('views/pages/customer/personal-info'),
)

function AllRoutes() {
  return (
    <>
    <Suspense
      fallback={
        <div className='loading-container'>
          <Rings
            heigth="100"
            width="100"
            color='#1877f2'
            ariaLabel='loading'
          />
          <div>Loading data...</div>
        </div>
      }
    >
      <Routes>
      <Route path="/" element={<Navigate to={'/pet'} />} />
        <Route element={<CustomerRoutes />}>
          <Route path="/pet" element={<MainLayout component={InfoPet} />} />
          <Route
            path="/personal-info"
            element={<MainLayout component={PersonalInfo} />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" >Cook</Route>
      </Routes>
    </Suspense>
    </>
  )
}

export default AllRoutes
