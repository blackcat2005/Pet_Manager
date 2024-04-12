import React from "react";
import { Navigate, Routes, Route } from 'react-router-dom'
import Login from "views/pages/login";



function AllRoutes(){
    return(
        // <Routes>
        //     <Route path="/" element={<Navigate to={'/login'} />} />
        //     <Route>
        //         <Route path="/login" element={<Login />} />
        //     </Route>
        // </Routes>
        <>
            <Login />
        </>
    )
}


export default AllRoutes;