import { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { UserContext } from "context/UserContext";

const CustomerRoutes = (props) => {
    const { user } = useContext(UserContext);
    console.log(user);
    if (user && user.isAuthenticated) {
        return (
            <Outlet />
        )
    }
    return (
        <>
            <Navigate to='/login' />
        </>

    )

}

export default CustomerRoutes;