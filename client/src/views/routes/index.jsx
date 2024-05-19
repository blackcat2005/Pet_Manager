import loadableComponent from 'utils/loadable-component'
import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import MainLayout from 'components/layouts/MainLayout'
import Register from 'views/pages/register'
import ForgotPassword from 'views/pages/forgot-password/forgot-password'
import ResetPassword from 'views/pages/forgot-password/reset-password'
import ServiceHistory from 'views/pages/customer/service-history'
import Homepage from 'views/pages/homePage'
import ServiceCost from 'views/pages/customer/service-cost'
import { RoleProtectedRoute } from './role.protected.route'
import GuestRoute from './guest-route'

const PetList = loadableComponent(() => import('views/pages/customer/info-pet'))
const PetInfo = loadableComponent(
  () => import('views/pages/customer/info-pet/PetInfo'),
)

const CustomerListPage = loadableComponent(() => import('views/pages/admin/staff/crud_table'))
const ManageCustomer = loadableComponent(() => import('views/pages/admin/customer/manage-customer'))


const Login = loadableComponent(() => import('views/pages/login'))
const PersonalInfo = loadableComponent(
  () => import('views/pages/customer/personal-info'),
)
const ServiceRegisterPet = loadableComponent(
  () => import('views/pages/customer/service-register'),
)

const PetManager = loadableComponent(() => import('views/pages/staff/test'))

function AllRoutes() {
  return (
    <>
      {/* <Suspense
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
      > */}
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route element={<RoleProtectedRoute roles={['customer']} />}>
          <Route path="/pet" element={<MainLayout component={PetList} />} />
          <Route
            path="/pet/basic-info/:slug"
            element={<MainLayout component={PetInfo} />}
          />

          <Route
            path="/service-register"
            element={<MainLayout component={ServiceRegisterPet} />}
          />
          <Route
            path="/service-history"
            element={<MainLayout component={ServiceHistory} />}
          />
          <Route
            path="/service-cost"
            element={<MainLayout component={ServiceCost} />}
          />
        </Route>

        <Route element={<RoleProtectedRoute roles={['staff']} />}>
          <Route
            path="/pet-manager"
            element={<MainLayout component={PetManager} />}
          />
        </Route>

        <Route element={<RoleProtectedRoute roles={['admin']} />}>
          <Route
            path="/staff-manager"
            element={<MainLayout component={CustomerListPage} />}
          />
          <Route
            path="/customer-manager"
            element={<MainLayout component={ManageCustomer} />}
          />
        </Route>

        <Route
          element={
            <RoleProtectedRoute roles={['staff', 'customer', 'admin']} />
          }
        >
          <Route
            path="/personal-info"
            element={<MainLayout component={PersonalInfo} />}
          />
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="*">Cook</Route>
      </Routes>
      {/* </Suspense> */}
    </>
  )
}

export default AllRoutes
