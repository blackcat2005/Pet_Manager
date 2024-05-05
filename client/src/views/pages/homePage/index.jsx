import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    return (
        <>
            <span>
                Home page
            </span>
            <button onClick={() => handleLogout()}>
                log out
            </button>
        </>

    )
}

export default HomePage
