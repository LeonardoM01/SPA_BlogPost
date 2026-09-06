import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth"
import { Spinner } from "../Spinner";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated && !isLoading){
            navigate('/auth/login')
        }
    }, [isAuthenticated, isLoading, navigate])

    if (isLoading){
        return <Spinner/>
    }

    if (!isAuthenticated) {
        return null
    }

    return children;

}

export default ProtectedRoute;