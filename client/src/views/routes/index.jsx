import loadableComponent from 'utils/loadable-component'
import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import MainLayout from 'components/layouts/MainLayout'
import Register from 'views/pages/register'
import ForgotPassword from 'views/pages/forgot-password/forgot-password'
import ResetPassword from 'views/pages/forgot-password/reset-password'
import Homepage from 'views/pages/homePage'
import { RoleProtectedRoute } from './role.protected.route'
import GuestRoute from './guest-route'
import PetInfoOverview from 'views/pages/admin/staff/pet-info/info_overview'

const PetList = loadableComponent(() => import('views/pages/customer/info-pet'))
const PetInfo = loadableComponent(() => import('views/pages/customer/info-pet/PetInfo'))
const ServiceRegisterPet = loadableComponent(() => import('views/pages/customer/service-register'))
const ServiceHistory = loadableComponent(() => import('views/pages/customer/service-history'))
const ServiceCost = loadableComponent(() => import('views/pages/customer/service-cost'))

const StaffManage = loadableComponent(() => import('views/pages/admin/staff/manage-staff'))
const ManageCustomer = loadableComponent(() => import('views/pages/admin/customer/manage-customer'))
const Statistics = loadableComponent(() => import('views/pages/admin/statistics/statistics'))
// const PetInfoOverview = loadableComponent(() => import('views/pages/admin/staff/pet-info/info_overview'))


const Login = loadableComponent(() => import('views/pages/login'))
const PersonalInfo = loadableComponent(() => import('views/pages/customer/personal-info'))


function AllRoutes() {
  return (
    <>
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
            path="/staff/pet-manage"
            element={<MainLayout component={PetInfoOverview} />}
          />
          <Route
            path="/staff/customer-manage"
            element={<MainLayout component={ManageCustomer} />}
          />
        </Route>

        <Route element={<RoleProtectedRoute roles={['admin']} />}>
          <Route
            path="/admin/statistics"
            element={<MainLayout component={Statistics} />}
          />
          <Route
            path="/admin/staff-manage"
            element={<MainLayout component={StaffManage} />}
          />
          <Route
            path="/admin/customer-manage"
            element={<MainLayout component={ManageCustomer} />}
          />
          <Route
            path="/admin/pet-manage"
            // element={<MainLayout component={PetInfoOverview} />}
            element={<MainLayout component={PetInfoOverview} />}
          />
        </Route>

        <Route element={<RoleProtectedRoute roles={['staff', 'customer', 'admin']} />}>
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
    </>
  )
}

export default AllRoutes
