import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'hooks/useAuth'

const CustomerRoutes = () => {
  // const token =  localStorage.getItem('token')
  const { userData } = useAuth()
  console.log(userData)
  if (userData) {
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
}

export default CustomerRoutes
