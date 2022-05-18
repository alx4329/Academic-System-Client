import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
    const user = useSelector(state => state.auth.user);
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return (user.rol === "Admin" || user.rol === "SuperAdmin") ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;