import { Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

const CustomerRoutes = (props) => {
    const {userData} = useAuth()

    if (userData) {
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