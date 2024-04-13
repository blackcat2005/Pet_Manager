import loadableComponent from "components/loadable-component";
import React from "react";
import { Navigate, Routes, Route } from 'react-router-dom'
import GuestRoute from "./guest-route";

const Login = loadableComponent(()=> import('views/pages/login'))

function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    )
}


export default AllRoutes;