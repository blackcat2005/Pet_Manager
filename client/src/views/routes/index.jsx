import loadableComponent from 'utils/loadable-component'
import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { Suspense } from "react";
import MainLayout from 'components/layouts/MainLayout'
import Register from 'views/pages/register'
import ForgotPassword from 'views/pages/forgot-password/forgot-password'
import { CustomerRoutes } from './customer';
import { AdminRoutes } from './admin';
import { Rings } from 'react-loader-spinner';
import ResetPassword from 'views/pages/forgot-password/reset-password';
import HomePage from 'views/pages/homePage';

const InfoPet = loadableComponent(() => import('views/pages/customer/info-pet'))
const Login = loadableComponent(() => import('views/pages/login'))

const PersonalInfo = loadableComponent(() => import('views/pages/customer/personal-info'))
const ServiceRegisterPet = loadableComponent(() => import('views/pages/customer/service-register'))

const ManageCusomer = loadableComponent(() => import('views/pages/admin/customer/manage-customer'))

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
          <Route path="/" element={<HomePage />} />

          <Route element={<CustomerRoutes />}>
            <Route path="/pet" element={<MainLayout component={InfoPet} />} />
            <Route path="/personal-info" element={<MainLayout component={PersonalInfo} />} />
            <Route path="/service-register" element={<MainLayout component={ServiceRegisterPet} />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/manage-customer" element={<MainLayout component={ManageCusomer} />} />

          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" >Cook</Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default AllRoutes
