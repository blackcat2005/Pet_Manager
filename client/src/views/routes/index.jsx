import loadableComponent from 'utils/loadable-component'
import React from 'react'
import Spinner from 'components/spinner';
import { Navigate, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import MainLayout from 'components/layouts/MainLayout'
import Register from 'views/pages/register'
import ForgotPassword from 'views/pages/forgot-password/forgot-password'
import { CustomerRoutes } from './customer'
import { Rings } from 'react-loader-spinner'
import ResetPassword from 'views/pages/forgot-password/reset-password'
import ServiceHistory from 'views/pages/customer/service-history';
import Homepage from 'views/pages/homePage';
import ServiceCost from 'views/pages/customer/service-cost';

const PetList = loadableComponent(() => import('views/pages/customer/info-pet'))
const PetInfo = loadableComponent(() => import('views/pages/customer/info-pet/PetInfo'))
const Login = loadableComponent(() => import('views/pages/login'))
const PersonalInfo = loadableComponent(
  () => import('views/pages/customer/personal-info'),
)
const ServiceRegisterPet = loadableComponent(
  () => import('views/pages/customer/service-register'),
)

function AllRoutes() {
  return (
    <>
      <Suspense
        fallback={
          <div className="loading-container">
            <Rings
              heigth="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route element={<CustomerRoutes />}>
            <Route path="/pet" element={<MainLayout component={PetList} />} />
            <Route
              path="/pet/basic-info/:slug"
              element={<MainLayout component={PetInfo} />}
            />
            <Route
              path="/personal-info"
              element={<MainLayout component={PersonalInfo} />}
            />
            <Route
              path="/service-register"
              element={<MainLayout component={ServiceRegisterPet} />}
            />
            <Route path="/service-history" element={<MainLayout component={ServiceHistory} />} />
            <Route path="/service-cost" element={<MainLayout component={ServiceCost} />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*">Cook</Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default AllRoutes
