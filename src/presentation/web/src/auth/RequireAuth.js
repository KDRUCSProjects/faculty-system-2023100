import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";
import useAuth from "hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

    return (
        auth?.user ? <Outlet />
            : token ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;