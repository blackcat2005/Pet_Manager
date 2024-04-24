import loadableComponent from "utils/loadable-component";
import React from "react";
import { Navigate, Routes, Route } from 'react-router-dom'
import GuestRoute from "./guest-route";
import Test from "views/pages/admin/test";
import MainLayout from "components/layouts/MainLayout";
// import MainLayout from "components/layouts/MainLayout";
// import Test from "views/pages/admin/test";
// import InfoPet from "views/pages/customer/info-pet";    

const InfoPet = loadableComponent(()=> import('views/pages/customer/info-pet'))
const Login = loadableComponent(()=> import('views/pages/login'))
const PersonalInfo = loadableComponent(()=>import('views/pages/customer/personal-info'))
function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/personal-info" element={<MainLayout component={PersonalInfo} />} />
            <Route path="/test" element={<Test />} />
            <Route path="/pet" element={<MainLayout component={InfoPet} />} />
        </Routes>
    )
}


export default AllRoutes;