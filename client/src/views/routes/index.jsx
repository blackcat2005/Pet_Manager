import loadableComponent from "utils/loadable-component";
import React from "react";
import { Navigate, Routes, Route } from 'react-router-dom'
import GuestRoute from "./guest-route";
import Test from "views/pages/admin/test";
import MainLayout from "components/layouts/MainLayout";
import Register from "views/pages/register";
import { UserContext } from "../../context/UserContext"
import CustomerRoutes from "./customer";
import HomePage from "views/pages/homePage";

const InfoPet = loadableComponent(() => import('views/pages/customer/info-pet'))
const Login = loadableComponent(() => import('views/pages/login'))
const PersonalInfo = loadableComponent(() => import('views/pages/customer/personal-info'))

function AllRoutes() {


    return (
        <Routes>
            <Route element={<CustomerRoutes />}>
                <Route path="/pet" element={<MainLayout component={InfoPet} />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" exact element={<HomePage />} />
            <Route path="*">
                404 not found
            </Route>

            {/* <Route path="/personal-info" element={<MainLayout component={PersonalInfo} />} />
            <Route path="/test" element={<Test />} /> */}
        </Routes>
    )
}


export default AllRoutes;