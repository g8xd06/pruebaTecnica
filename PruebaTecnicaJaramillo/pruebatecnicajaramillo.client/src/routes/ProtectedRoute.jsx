import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

//Ruta para proteger el dashboard si no hay login
function ProtectedRoute() {
    const auth = useAuth();

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;